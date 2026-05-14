import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import { insertHistory } from '../lib/history'
import type { StickerWithStatus } from '../lib/types'

interface Props {
  sticker: StickerWithStatus
  onClose: () => void
  onUpdate: (updated: Partial<StickerWithStatus>) => void
}

export default function StickerModal({ sticker, onClose, onUpdate }: Props) {
  const { auth } = useAuth()
  const [qMe, setQMe] = useState(sticker.quantity_me ?? 0)
  const [qBro, setQBro] = useState(sticker.quantity_brother ?? 0)
  const [saving, setSaving] = useState(false)

  async function save(newQMe: number, newQBro: number) {
    if (!auth) return
    setSaving(true)
    const newData = {
      collection_id: auth.collectionId,
      sticker_id: sticker.id,
      owned: newQMe > 0 || newQBro > 0,
      quantity_me: newQMe,
      quantity_brother: newQBro,
    }
    await supabase.from('collection_stickers').upsert(newData)
    onUpdate(newData)
    setSaving(false)
  }

  async function changeQMe(delta: number) {
    const prev = qMe
    const next = Math.max(0, prev + delta)
    if (next === prev) return
    setQMe(next)
    await save(next, qBro)
    if (auth) insertHistory({
      collectionId: auth.collectionId,
      stickerCode: sticker.id,
      stickerName: sticker.player_name,
      action: next > prev ? 'added' : 'removed',
      actor: 'me',
    })
  }

  async function changeQBro(delta: number) {
    const prev = qBro
    const next = Math.max(0, prev + delta)
    if (next === prev) return
    setQBro(next)
    await save(qMe, next)
    if (auth) insertHistory({
      collectionId: auth.collectionId,
      stickerCode: sticker.id,
      stickerName: sticker.player_name,
      action: next > prev ? 'added' : 'removed',
      actor: 'brother',
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#1e1e1e] rounded-t-3xl w-full max-w-md p-6 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 dark:bg-[#333] rounded-full mx-auto mb-4" />

        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-[#aaa] font-mono">{sticker.id}</p>
            <h2 className="text-lg font-bold text-gray-800 dark:text-[#f0f0f0]">{sticker.player_name}</h2>
          </div>
          {saving && (
            <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between bg-orange-50 dark:bg-[#4a2800] rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
                MAG
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-[#f0f0f0]">Maguto</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => changeQMe(-1)}
                disabled={qMe === 0}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#444] text-xl font-bold flex items-center justify-center disabled:opacity-30 text-gray-800 dark:text-[#ddd]"
              >
                −
              </button>
              <span className="w-6 text-center font-bold text-lg text-gray-800 dark:text-[#f0f0f0]">{qMe}</span>
              <button
                onClick={() => changeQMe(1)}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#444] text-xl font-bold flex items-center justify-center text-gray-800 dark:text-[#ddd]"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-blue-50 dark:bg-[#002a4a] rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold">
                GAB
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-[#f0f0f0]">Gabriel</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => changeQBro(-1)}
                disabled={qBro === 0}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#444] text-xl font-bold flex items-center justify-center disabled:opacity-30 text-gray-800 dark:text-[#ddd]"
              >
                −
              </button>
              <span className="w-6 text-center font-bold text-lg text-gray-800 dark:text-[#f0f0f0]">{qBro}</span>
              <button
                onClick={() => changeQBro(1)}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#444] text-xl font-bold flex items-center justify-center text-gray-800 dark:text-[#ddd]"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
