import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import { calcExtras } from '../lib/extras'
import StickerCard from '../components/StickerCard'
import StickerModal from '../components/StickerModal'
import type { StickerWithStatus, StickerFilter, Team } from '../lib/types'

const FLAG_EMOJI: Record<string, string> = {
  MEX: '🇲🇽', ZAF: '🇿🇦', KOR: '🇰🇷', CZE: '🇨🇿',
  CAN: '🇨🇦', BIH: '🇧🇦', QAT: '🇶🇦', SUI: '🇨🇭',
  BRA: '🇧🇷', MAR: '🇲🇦', HAI: '🇭🇹', SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  USA: '🇺🇸', PAR: '🇵🇾', AUS: '🇦🇺', TUR: '🇹🇷',
  GER: '🇩🇪', CUW: '🇨🇼', CIV: '🇨🇮', ECU: '🇪🇨',
  NED: '🇳🇱', JPN: '🇯🇵', SWE: '🇸🇪', TUN: '🇹🇳',
  BEL: '🇧🇪', EGY: '🇪🇬', IRN: '🇮🇷', NZL: '🇳🇿',
  ESP: '🇪🇸', CPV: '🇨🇻', KSA: '🇸🇦', URY: '🇺🇾',
  FRA: '🇫🇷', SEN: '🇸🇳', IRQ: '🇮🇶', NOR: '🇳🇴',
  ARG: '🇦🇷', ALG: '🇩🇿', AUT: '🇦🇹', JOR: '🇯🇴',
  POR: '🇵🇹', COD: '🇨🇩', UZB: '🇺🇿', COL: '🇨🇴',
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', CRO: '🇭🇷', GHA: '🇬🇭', PAN: '🇵🇦',
  FWC: '🏟️',
}

type FilterOption = { key: StickerFilter; label: string }
const FILTERS: FilterOption[] = [
  { key: 'all', label: 'Todas' },
  { key: 'mine', label: 'Maguto' },
  { key: 'brother', label: 'Gabriel' },
  { key: 'duplicates', label: 'Repetidas' },
]

export default function Section() {
  const { teamId } = useParams<{ teamId: string }>()
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [team, setTeam] = useState<Team | null>(null)
  const [stickers, setStickers] = useState<StickerWithStatus[]>([])
  const [filter, setFilter] = useState<StickerFilter>('all')
  const [selected, setSelected] = useState<StickerWithStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth || !teamId) return

    async function load() {
      const [teamRes, stickersRes, collectionRes] = await Promise.all([
        supabase.from('teams').select('*').eq('id', teamId).single(),
        supabase.from('stickers').select('*').eq('team_id', teamId).order('number'),
        supabase
          .from('collection_stickers')
          .select('*')
          .eq('collection_id', auth!.collectionId),
      ])

      if (teamRes.data) setTeam(teamRes.data)

      const statusMap: Record<string, StickerWithStatus> = {}
      for (const cs of collectionRes.data || []) {
        statusMap[cs.sticker_id] = cs
      }

      const merged: StickerWithStatus[] = (stickersRes.data || []).map((s) => ({
        ...s,
        ...(statusMap[s.id] || { owned: false, quantity_me: 0, quantity_brother: 0 }),
      }))

      setStickers(merged)
      setLoading(false)
    }

    load()
  }, [auth, teamId])

  function applyFilter(list: StickerWithStatus[]): StickerWithStatus[] {
    switch (filter) {
      case 'mine':       return list.filter((s) => (s.quantity_me ?? 0) > 0)
      case 'brother':    return list.filter((s) => (s.quantity_brother ?? 0) > 0)
      case 'duplicates': return list.filter((s) => {
        const { extrasMe, extrasBro } = calcExtras(s.quantity_me ?? 0, s.quantity_brother ?? 0)
        return extrasMe + extrasBro > 0
      })
      default:           return list
    }
  }

  function handleUpdate(updated: Partial<StickerWithStatus>) {
    setStickers((prev) =>
      prev.map((s) => (s.id === selected?.id ? { ...s, ...updated } : s))
    )
    if (selected) setSelected((prev) => (prev ? { ...prev, ...updated } : null))
  }

  const collected = stickers.filter((s) => (s.quantity_me ?? 0) > 0 || (s.quantity_brother ?? 0) > 0).length
  const filtered = applyFilter(stickers)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <button onClick={() => navigate('/album')} className="text-green-300 text-sm mb-2">
          ← Álbum
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{FLAG_EMOJI[teamId || ''] || '🏳️'}</span>
          <div>
            <h1 className="text-white text-xl font-bold">{team?.name || teamId}</h1>
            <p className="text-green-300 text-sm">
              {teamId === 'FWC' ? 'Especiais' : `Grupo ${team?.group}`} · {collected}/{stickers.length}
            </p>
          </div>
        </div>
        <div className="w-full bg-green-900 rounded-full h-1.5 mt-3">
          <div
            className="bg-white h-1.5 rounded-full transition-all"
            style={{ width: `${stickers.length > 0 ? (collected / stickers.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium ${
              filter === f.key
                ? 'bg-green-700 text-white'
                : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-[#aaa]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-4 pb-6">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-[#555] py-8">Nenhuma figurinha neste filtro</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map((s) => (
              <StickerCard key={s.id} sticker={s} onClick={() => setSelected(s)} />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <StickerModal
          sticker={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}
