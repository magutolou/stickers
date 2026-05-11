import { useEffect, useState, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import { calcExtras } from '../lib/extras'
import type { StickerWithStatus } from '../lib/types'

type TradeFilter = 'all' | 'mine' | 'brother'

interface StickerWithTeam extends StickerWithStatus {
  team_name?: string
  team_group?: string
}

const GROUP_ORDER = ['FWC', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export default function Trades() {
  const { auth } = useAuth()
  const [items, setItems] = useState<StickerWithTeam[]>([])
  const [filter, setFilter] = useState<TradeFilter>('all')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return

    async function load() {
      const { data } = await supabase
        .from('collection_stickers')
        .select('*, stickers(*, teams(id, name, group))')
        .eq('collection_id', auth!.collectionId)
        .or('quantity_me.gt.0,quantity_brother.gt.0')

      if (!data) { setLoading(false); return }

      const merged: StickerWithTeam[] = data
        .map((cs: any) => ({
          ...cs.stickers,
          ...cs,
          team_name: cs.stickers?.teams?.name,
          team_group: cs.stickers?.teams?.group,
        }))
        .filter((s: StickerWithTeam) => {
          const { extrasMe, extrasBro } = calcExtras(s.quantity_me ?? 0, s.quantity_brother ?? 0)
          return extrasMe + extrasBro > 0
        })
      setItems(merged)
      setLoading(false)
    }

    load()
  }, [auth])

  const groups = useMemo(() => {
    const gs = new Set(items.map((s) => s.team_group).filter(Boolean) as string[])
    return GROUP_ORDER.filter((g) => gs.has(g))
  }, [items])

  const teamsInGroup = useMemo(() => {
    if (!selectedGroup) return []
    const seen = new Map<string, string>()
    for (const s of items) {
      if (s.team_group === selectedGroup && s.team_id && s.team_name) {
        seen.set(s.team_id, s.team_name)
      }
    }
    return [...seen.entries()].map(([id, name]) => ({ id, name }))
  }, [items, selectedGroup])

  function toggleGroup(g: string) {
    if (selectedGroup === g) {
      setSelectedGroup(null)
      setSelectedTeam(null)
    } else {
      setSelectedGroup(g)
      setSelectedTeam(null)
    }
  }

  function toggleTeam(id: string) {
    setSelectedTeam((prev) => (prev === id ? null : id))
  }

  const filtered = items.filter((s) => {
    const { extrasMe, extrasBro } = calcExtras(s.quantity_me ?? 0, s.quantity_brother ?? 0)
    if (filter === 'mine' && extrasMe === 0) return false
    if (filter === 'brother' && extrasBro === 0) return false
    if (selectedGroup && s.team_group !== selectedGroup) return false
    if (selectedTeam && s.team_id !== selectedTeam) return false
    return true
  })

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Trocas</h1>
        <p className="text-green-300 text-sm">{items.length} figurinhas para trocar</p>
      </div>

      {/* Filtro de dono */}
      <div className="flex gap-2 px-4 pt-3">
        {(['all', 'mine', 'brother'] as TradeFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              filter === f ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'mine' ? 'Maguto' : 'Gabriel'}
          </button>
        ))}
      </div>

      {/* Filtro de grupo */}
      <div className="px-4 pt-2 overflow-x-auto">
        <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => toggleGroup(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                selectedGroup === g
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {g === 'FWC' ? 'FWC' : `Grupo ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro de país */}
      {teamsInGroup.length > 0 && (
        <div className="px-4 pt-1 overflow-x-auto">
          <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
            {teamsInGroup.map((t) => (
              <button
                key={t.id}
                onClick={() => toggleTeam(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  selectedTeam === t.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-12">Nenhuma figurinha para trocar aqui</p>
      ) : (
        <div className="px-4 space-y-2 pb-6 mt-2">
          {filtered.map((s) => {
            const { extrasMe: excessMe, extrasBro: excessBro } = calcExtras(s.quantity_me ?? 0, s.quantity_brother ?? 0)
            return (
              <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <span className="font-mono text-xs bg-gray-100 rounded px-2 py-1 text-gray-600 flex-shrink-0">
                  {s.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">{s.player_name}</p>
                  {s.team_name && (
                    <p className="text-xs text-gray-400 truncate">{s.team_name}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {excessMe > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold rounded-full px-2 py-0.5">
                      MAG +{excessMe}
                    </span>
                  )}
                  {excessBro > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold rounded-full px-2 py-0.5">
                      GAB +{excessBro}
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
