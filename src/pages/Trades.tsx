import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import type { StickerWithStatus } from '../lib/types'

type TradeFilter = 'all' | 'mine' | 'brother'

export default function Trades() {
  const { auth } = useAuth()
  const [items, setItems] = useState<StickerWithStatus[]>([])
  const [filter, setFilter] = useState<TradeFilter>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return

    async function load() {
      const { data } = await supabase
        .from('collection_stickers')
        .select('*, stickers(*)')
        .eq('collection_id', auth!.collectionId)
        .or('quantity_me.gt.0,quantity_brother.gt.0')

      if (!data) { setLoading(false); return }

      const merged: StickerWithStatus[] = data
        .map((cs: any) => ({ ...cs.stickers, ...cs }))
        .filter((s: StickerWithStatus) => (s.quantity_me ?? 0) + (s.quantity_brother ?? 0) > 1)
      setItems(merged)
      setLoading(false)
    }

    load()
  }, [auth])

  const filtered = items.filter((s) => {
    if (filter === 'mine')    return (s.quantity_me ?? 0) > 0
    if (filter === 'brother') return (s.quantity_brother ?? 0) > 0
    return true
  })

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Trocas</h1>
        <p className="text-green-300 text-sm">{items.length} figurinhas para trocar</p>
      </div>

      <div className="flex gap-2 px-4 py-3">
        {(['all', 'mine', 'brother'] as TradeFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              filter === f ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'mine' ? 'Minhas' : 'Irmão'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-12">Nenhuma figurinha para trocar aqui</p>
      ) : (
        <div className="px-4 space-y-2 pb-6">
          {filtered.map((s) => {
            const excessMe = Math.max(0, (s.quantity_me ?? 0) - 1)
            const excessBro = Math.max(0, (s.quantity_brother ?? 0) - 1)
            return (
              <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <span className="font-mono text-xs bg-gray-100 rounded px-2 py-1 text-gray-600 flex-shrink-0">
                  {s.id}
                </span>
                <span className="flex-1 text-sm text-gray-800 truncate">{s.player_name}</span>
                <div className="flex gap-2 flex-shrink-0">
                  {excessMe > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold rounded-full px-2 py-0.5">
                      EU +{excessMe}
                    </span>
                  )}
                  {excessBro > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold rounded-full px-2 py-0.5">
                      IR +{excessBro}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
