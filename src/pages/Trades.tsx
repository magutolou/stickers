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

const ISO_CODE: Record<string, string> = {
  MEX: 'mx', ZAF: 'za', KOR: 'kr', CZE: 'cz',
  CAN: 'ca', BIH: 'ba', QAT: 'qa', SUI: 'ch',
  BRA: 'br', MAR: 'ma', HAI: 'ht', SCO: 'gb-sct',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  GER: 'de', CUW: 'cw', CIV: 'ci', ECU: 'ec',
  NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz',
  ESP: 'es', CPV: 'cv', KSA: 'sa', URY: 'uy',
  FRA: 'fr', SEN: 'sn', IRQ: 'iq', NOR: 'no',
  ARG: 'ar', ALG: 'dz', AUT: 'at', JOR: 'jo',
  POR: 'pt', COD: 'cd', UZB: 'uz', COL: 'co',
  ENG: 'gb-eng', CRO: 'hr', GHA: 'gh', PAN: 'pa',
}

function FlagIcon({ teamId }: { teamId: string }) {
  const iso = ISO_CODE[teamId]
  if (!iso) return <span style={{ fontSize: '0.9rem' }}>🏟️</span>
  return (
    <span
      className={`fi fi-${iso}`}
      style={{ fontSize: '0.9rem', borderRadius: '3px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
    />
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Trades() {
  const { auth } = useAuth()
  const [items, setItems] = useState<StickerWithTeam[]>([])
  const [allTeamsByGroup, setAllTeamsByGroup] = useState<Record<string, string[]>>({})
  const [filter, setFilter] = useState<TradeFilter>('all')
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return

    async function load() {
      const [{ data }, { data: teamsData }] = await Promise.all([
        supabase
          .from('collection_stickers')
          .select('*, stickers(*, teams(id, name, group))')
          .eq('collection_id', auth!.collectionId)
          .or('quantity_me.gt.0,quantity_brother.gt.0'),
        supabase.from('teams').select('id, group'),
      ])

      if (teamsData) {
        const byGroup: Record<string, string[]> = {}
        for (const t of teamsData) {
          if (!byGroup[t.group]) byGroup[t.group] = []
          byGroup[t.group].push(t.id)
        }
        setAllTeamsByGroup(byGroup)
      }

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

  const filtered = useMemo(() => items.filter((s) => {
    const { extrasMe, extrasBro } = calcExtras(s.quantity_me ?? 0, s.quantity_brother ?? 0)
    if (filter === 'mine' && extrasMe === 0) return false
    if (filter === 'brother' && extrasBro === 0) return false
    return true
  }), [items, filter])

  const grouped = useMemo(() => {
    const map = new Map<string, StickerWithTeam[]>()
    for (const s of filtered) {
      const g = s.team_group ?? 'FWC'
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(s)
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({ group: g, stickers: map.get(g)! }))
  }, [filtered])

  function toggleGroup(g: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(g)) next.delete(g)
      else next.add(g)
      return next
    })
  }

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Trocas</h1>
        <p className="text-green-300 text-sm">{items.length} figurinhas para trocar</p>
      </div>

      <div className="flex gap-2 px-4 pt-3 pb-2">
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

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-12">Nenhuma figurinha para trocar aqui</p>
      ) : (
        <div className="px-4 space-y-2 pb-6 mt-1">
          {grouped.map(({ group, stickers }) => {
            const isOpen = openGroups.has(group)
            return (
              <div key={group} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full grid items-center px-4 py-3"
                  style={{ gridTemplateColumns: 'auto 1fr auto' }}
                >
                  <span className="font-semibold text-gray-800 text-sm text-left">
                    {group === 'FWC' ? 'Especiais FWC' : `Grupo ${group}`}
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    {(allTeamsByGroup[group] ?? []).map((teamId) => (
                      <FlagIcon key={teamId} teamId={teamId} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-bold rounded-full px-2 py-0.5">
                      {stickers.length}
                    </span>
                    <span className="text-gray-400">
                      <Chevron open={isOpen} />
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-3 pb-3 pt-2 space-y-2">
                    {stickers.map((s) => {
                      const { extrasMe, extrasBro } = calcExtras(s.quantity_me ?? 0, s.quantity_brother ?? 0)
                      return (
                        <div key={s.id} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                          <span className="font-mono text-xs bg-white border border-gray-200 rounded px-2 py-1 text-gray-600 flex-shrink-0">
                            {s.id}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 truncate">{s.player_name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {s.team_id && <FlagIcon teamId={s.team_id} />}
                              {s.team_name && (
                                <span className="text-xs text-gray-400 truncate">{s.team_name}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {extrasMe > 0 && (
                              <span className="bg-orange-100 text-orange-700 text-xs font-bold rounded-full px-2 py-0.5">
                                MAG +{extrasMe}
                              </span>
                            )}
                            {extrasBro > 0 && (
                              <span className="bg-blue-100 text-blue-700 text-xs font-bold rounded-full px-2 py-0.5">
                                GAB +{extrasBro}
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
          })}
        </div>
      )}
    </div>
  )
}
