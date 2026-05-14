import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import type { StickerHistory } from '../lib/types'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'agora pouco'
  if (mins < 60) return `${mins} min atrás`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h atrás`
  if (Math.floor(hours / 24) === 1) return 'ontem'
  return `${Math.floor(hours / 24)} dias atrás`
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function HistoryDrawer({ open, onClose }: Props) {
  const { auth } = useAuth()
  const [entries, setEntries] = useState<StickerHistory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !auth) return
    setLoading(true)
    supabase
      .from('sticker_history')
      .select('*')
      .eq('collection_id', auth.collectionId)
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setEntries((data as StickerHistory[]) || [])
        setLoading(false)
      })
  }, [open, auth])

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-white dark:bg-[#1e1e1e] rounded-t-3xl transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-12 h-1 bg-gray-300 dark:bg-[#333] rounded-full mx-auto mt-3" />

        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-[#2a2a2a]">
          <h2 className="font-bold text-gray-800 dark:text-[#f0f0f0]">Histórico</h2>
          <button onClick={onClose} className="text-gray-400 dark:text-[#555] p-1 -mr-1">
            <i className="ti ti-x text-lg leading-none" />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : entries.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-[#555] py-10">Nenhuma alteração ainda</p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-[#2a2a2a] pb-6">
              {entries.map((e) => {
                const actorName = e.actor === 'me' ? 'Maguto' : 'Gabriel'
                const actionText = e.action === 'added' ? 'adicionou' : 'removeu'
                return (
                  <li key={e.id} className="flex items-center gap-3 px-5 py-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                        e.actor === 'me' ? 'bg-orange-400' : 'bg-blue-400'
                      }`}
                    >
                      {e.actor === 'me' ? 'MAG' : 'GAB'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 dark:text-[#f0f0f0] leading-snug">
                        <span className="font-semibold">{actorName}</span>{' '}
                        {actionText}{' '}
                        <span className="font-mono font-semibold">{e.sticker_code}</span>
                        {' · '}
                        <span className="text-gray-500 dark:text-[#aaa]">{e.sticker_name}</span>
                      </p>
                      <p className="text-xs text-gray-400 dark:text-[#555] mt-0.5">{timeAgo(e.created_at)}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
