import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createWorker } from 'tesseract.js'
import type { Worker } from 'tesseract.js'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import { insertHistory } from '../lib/history'

type Step = 'intro' | 'scanning' | 'confirm'

interface SessionSticker {
  id: string
  player_name: string
}

interface ConfirmSticker extends SessionSticker {
  currentQty: number
}

const INTRO_STEPS = [
  'Aponte a câmera para o código no verso da figurinha (ex: BRA-7)',
  'Aperte Escanear — o app lê o código e adiciona à sessão',
  'Repita pra cada figurinha, depois toque em Encerrar',
  'Confirme a lista antes de salvar no álbum',
]

export default function Camera() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('intro')
  const [session, setSession] = useState<SessionSticker[]>([])
  const [confirmList, setConfirmList] = useState<ConfirmSticker[]>([])
  const [catalog, setCatalog] = useState<Map<string, SessionSticker>>(new Map())
  const [toast, setToast] = useState<string | null>(null)
  const [ocring, setOcring] = useState(false)
  const [workerReady, setWorkerReady] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Carrega catálogo de figurinhas
  useEffect(() => {
    if (!auth) return
    supabase
      .from('stickers')
      .select('id, player_name')
      .then(({ data }) => {
        if (!data) return
        const map = new Map<string, SessionSticker>()
        for (const s of data) map.set(s.id, { id: s.id, player_name: s.player_name })
        setCatalog(map)
      })
  }, [auth])

  // Conecta stream ao video e inicializa worker ao entrar na etapa de escaneamento
  useEffect(() => {
    if (step !== 'scanning') return

    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }

    let active = true
    createWorker('eng').then(worker => {
      if (!active) { worker.terminate(); return }
      workerRef.current = worker
      setWorkerReady(true)
    })

    return () => {
      active = false
      workerRef.current?.terminate()
      workerRef.current = null
      setWorkerReady(false)
    }
  }, [step])

  // Para câmera ao desmontar
  useEffect(() => {
    return () => { stopCamera() }
  }, [])

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
  }

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(null), 2000)
  }

  async function startScanning() {
    setSession([])
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      streamRef.current = stream
    } catch {
      setCameraError('Não foi possível acessar a câmera. Verifique as permissões.')
    }
    setStep('scanning')
  }

  async function handleScan() {
    if (!videoRef.current || !canvasRef.current || !workerRef.current || ocring) return
    setOcring(true)

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    canvas.getContext('2d')!.drawImage(video, 0, 0)

    try {
      const { data: { text } } = await workerRef.current.recognize(canvas)
      const match =
        text.match(/[A-Z]{2,3}-\d{1,2}/) ??
        text.replace(/\s/g, '').match(/[A-Z]{2,3}-\d{1,2}/)

      if (!match) {
        showToast('Nenhum código encontrado, tente novamente')
      } else {
        const code = match[0]
        if (!catalog.has(code)) {
          showToast(`Código ${code} não está no catálogo`)
        } else if (session.some(s => s.id === code)) {
          showToast(`${code} já adicionada`)
        } else {
          setSession(prev => [...prev, catalog.get(code)!])
          showToast(`${code} lida!`)
        }
      }
    } catch {
      showToast('Erro ao processar imagem')
    }

    setOcring(false)
  }

  async function handleEndSession() {
    stopCamera()

    if (!auth || session.length === 0) {
      setStep('intro')
      return
    }

    const ids = session.map(s => s.id)
    const { data } = await supabase
      .from('collection_stickers')
      .select('sticker_id, quantity_me, quantity_brother')
      .eq('collection_id', auth.collectionId)
      .in('sticker_id', ids)

    const qtyMap = new Map<string, number>()
    for (const cs of data || []) {
      qtyMap.set(
        cs.sticker_id,
        auth.role === 'owner' ? cs.quantity_me : cs.quantity_brother,
      )
    }

    setConfirmList(session.map(s => ({
      ...s,
      currentQty: qtyMap.get(s.id) ?? 0,
    })))
    setStep('confirm')
  }

  function removeFromConfirm(id: string) {
    setConfirmList(prev => prev.filter(s => s.id !== id))
  }

  async function handleConfirm() {
    if (!auth || confirmList.length === 0) return
    setSaving(true)

    const ids = confirmList.map(s => s.id)
    const { data: existing } = await supabase
      .from('collection_stickers')
      .select('sticker_id, quantity_me, quantity_brother')
      .eq('collection_id', auth.collectionId)
      .in('sticker_id', ids)

    const existingMap = new Map<string, { quantity_me: number; quantity_brother: number }>()
    for (const cs of existing || []) existingMap.set(cs.sticker_id, cs)

    const upserts = confirmList.map(s => {
      const cur = existingMap.get(s.id)
      return {
        collection_id: auth.collectionId,
        sticker_id: s.id,
        owned: true,
        quantity_me: (cur?.quantity_me ?? 0) + (auth.role === 'owner' ? 1 : 0),
        quantity_brother: (cur?.quantity_brother ?? 0) + (auth.role === 'partner' ? 1 : 0),
      }
    })

    await supabase
      .from('collection_stickers')
      .upsert(upserts, { onConflict: 'collection_id,sticker_id' })

    for (const s of confirmList) {
      insertHistory({
        collectionId: auth.collectionId,
        stickerCode: s.id,
        stickerName: s.player_name,
        action: 'added',
        actor: auth.role === 'owner' ? 'me' : 'brother',
      })
    }

    setSaving(false)
    navigate('/album')
  }

  // ─── Etapa 1: Intro ───────────────────────────────────────────────────────

  if (step === 'intro') return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-5">
        <h1 className="text-white text-xl font-bold">Câmera</h1>
        <p className="text-green-300 text-sm">Escaneie várias figurinhas de uma vez</p>
      </div>

      <div className="px-4 py-6 flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <i className="ti ti-scan text-4xl text-green-700 dark:text-green-400 leading-none" />
        </div>

        <div className="w-full space-y-3">
          {INTRO_STEPS.map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 dark:text-[#ccc]">{text}</p>
            </div>
          ))}
        </div>

        <div className="w-full bg-yellow-50 dark:bg-[#2a2200] border border-yellow-200 dark:border-[#4a3a00] rounded-xl p-3">
          <p className="text-sm text-yellow-800 dark:text-[#f0c040]">
            💡 Boa iluminação ajuda bastante. O código fica no verso da figurinha, abaixo do nome.
          </p>
        </div>

        <button
          onClick={startScanning}
          className="w-full bg-green-700 text-white rounded-2xl p-4 font-semibold"
        >
          Iniciar escaneamento
        </button>
      </div>
    </div>
  )

  // ─── Etapa 2: Escaneamento ─────────────────────────────────────────────────

  if (step === 'scanning') return (
    <div className="flex flex-col">
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Câmera</h1>
        <p className="text-green-300 text-sm">Aponte pro código da figurinha</p>
      </div>

      {cameraError ? (
        <div className="px-6 py-10 text-center">
          <p className="text-red-500 dark:text-red-400 text-sm">{cameraError}</p>
          <button
            onClick={() => setStep('intro')}
            className="mt-4 text-sm text-gray-500 dark:text-[#aaa] underline"
          >
            Voltar
          </button>
        </div>
      ) : (
        <div className="relative bg-black" style={{ height: '50vh' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {/* Marcadores de canto */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-sm" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-sm" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-sm" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-sm" />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
        <p className="text-center text-sm text-gray-500 dark:text-[#aaa]">
          {session.length} escaneada{session.length !== 1 ? 's' : ''}
        </p>

        <div className="h-5 text-center">
          {toast && (
            <p className="text-sm font-medium text-green-700 dark:text-green-400">{toast}</p>
          )}
          {!workerReady && !cameraError && (
            <p className="text-xs text-gray-400 dark:text-[#555]">Preparando leitor…</p>
          )}
        </div>

        <button
          onClick={handleScan}
          disabled={ocring || !workerReady || !!cameraError}
          className="w-full bg-green-700 text-white rounded-2xl p-4 font-semibold disabled:opacity-50"
        >
          {ocring ? 'Lendo…' : 'Escanear'}
        </button>

        <button
          onClick={handleEndSession}
          className="w-full border border-gray-300 dark:border-[#444] rounded-2xl p-3 text-sm font-medium text-gray-600 dark:text-[#aaa]"
        >
          Encerrar sessão
        </button>
      </div>
    </div>
  )

  // ─── Etapa 3: Confirmação ──────────────────────────────────────────────────

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Confirmar</h1>
        <p className="text-green-300 text-sm">Revise antes de salvar</p>
      </div>

      <div className="px-4 py-4">
        <p className="text-sm text-gray-500 dark:text-[#aaa] mb-3">
          {confirmList.length} figurinha{confirmList.length !== 1 ? 's' : ''} no total
        </p>

        <div className="space-y-2">
          {confirmList.map(s => (
            <div
              key={s.id}
              className="flex items-center gap-3 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-xl p-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono font-bold text-sm text-gray-800 dark:text-[#f0f0f0]">{s.id}</p>
                <p className="text-xs text-gray-500 dark:text-[#aaa] mt-0.5 truncate">{s.player_name}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                s.currentQty === 0
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-orange-100 dark:bg-[#2a1800] text-orange-700 dark:text-orange-400'
              }`}>
                {s.currentQty === 0 ? 'Nova' : 'Repetida'}
              </span>
              <button
                onClick={() => removeFromConfirm(s.id)}
                className="text-gray-400 dark:text-[#555] p-1 shrink-0 flex items-center"
              >
                <i className="ti ti-x text-base leading-none" />
              </button>
            </div>
          ))}
        </div>

        {confirmList.length === 0 && (
          <p className="text-center text-gray-400 dark:text-[#555] py-10">
            Nenhuma figurinha na lista
          </p>
        )}

        <button
          onClick={handleConfirm}
          disabled={confirmList.length === 0 || saving}
          className="w-full bg-green-700 text-white rounded-2xl p-4 font-semibold mt-4 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : 'Confirmar adição'}
        </button>
      </div>
    </div>
  )
}
