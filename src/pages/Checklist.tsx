import { useEffect, useState, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import { calcExtras } from '../lib/extras'

type Tab = 'missing' | 'duplicates'

interface StickerRow {
  id: string
  team_id: string
  team_name: string
  team_group: string
}

interface CsRow {
  sticker_id: string
  quantity_me: number
  quantity_brother: number
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

function Flag({ teamId }: { teamId: string }) {
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

export default function Checklist() {
  const { auth } = useAuth()
  const [tab, setTab] = useState<Tab>('missing')
  const [allStickers, setAllStickers] = useState<StickerRow[]>([])
  const [csMap, setCsMap] = useState<Map<string, CsRow>>(new Map())
  const [teamsByGroup, setTeamsByGroup] = useState<Record<string, string[]>>({})
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const [fadingOut, setFadingOut] = useState<Set<string>>(new Set())
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const profileName = auth?.role === 'owner' ? 'Maguto' : 'Gabriel'

  useEffect(() => {
    if (!auth) return
    async function load() {
      const [{ data: sData }, { data: csData }, { data: tData }] = await Promise.all([
        supabase.from('stickers').select('id, team_id, teams(name, group)'),
        supabase
          .from('collection_stickers')
          .select('sticker_id, quantity_me, quantity_brother')
          .eq('collection_id', auth!.collectionId),
        supabase.from('teams').select('id, group'),
      ])

      if (sData) {
        setAllStickers(
          (sData as any[]).map((s) => ({
            id: s.id,
            team_id: s.team_id,
            team_name: s.teams?.name ?? '',
            team_group: s.teams?.group ?? 'FWC',
          }))
        )
      }

      if (csData) {
        const map = new Map<string, CsRow>()
        for (const cs of csData as CsRow[]) map.set(cs.sticker_id, cs)
        setCsMap(map)
      }

      if (tData) {
        const byGroup: Record<string, string[]> = {}
        for (const t of tData as { id: string; group: string }[]) {
          if (!byGroup[t.group]) byGroup[t.group] = []
          byGroup[t.group].push(t.id)
        }
        setTeamsByGroup(byGroup)
      }

      setLoading(false)
    }
    load()
  }, [auth])

  useEffect(() => {
    if (!auth) return
    const ch = supabase
      .channel('checklist-rt')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'collection_stickers', filter: `collection_id=eq.${auth.collectionId}` },
        (payload) => {
          const rec = payload.new as CsRow
          if (!rec?.sticker_id) return
          setCsMap((prev) => new Map(prev).set(rec.sticker_id, rec))
        }
      )
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [auth])

  const stickerById = useMemo(() => {
    const m = new Map<string, StickerRow>()
    for (const s of allStickers) m.set(s.id, s)
    return m
  }, [allStickers])

  const rawList = useMemo(() => {
    if (tab === 'missing') {
      return allStickers.filter((s) => {
        const cs = csMap.get(s.id)
        return !cs || (cs.quantity_me === 0 && cs.quantity_brother === 0)
      })
    }
    return allStickers.filter((s) => {
      const cs = csMap.get(s.id)
      if (!cs) return false
      const { extrasMe, extrasBro } = calcExtras(cs.quantity_me, cs.quantity_brother)
      return auth?.role === 'owner' ? extrasMe > 0 : extrasBro > 0
    })
  }, [allStickers, csMap, tab, auth])

  const grouped = useMemo(() => {
    const map = new Map<string, StickerRow[]>()

    for (const s of rawList) {
      if (dismissed.has(s.id)) continue
      const g = s.team_group
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(s)
    }

    // Keep chips currently fading out even if Realtime already removed them from rawList
    for (const id of fadingOut) {
      const s = stickerById.get(id)
      if (!s || dismissed.has(id)) continue
      const g = s.team_group
      const list = map.get(g)
      if (!list?.find((x) => x.id === id)) {
        if (!map.has(g)) map.set(g, [])
        map.get(g)!.push(s)
      }
    }

    return GROUP_ORDER
      .filter((g) => map.has(g))
      .map((g) => ({ group: g, stickers: map.get(g)! }))
  }, [rawList, dismissed, fadingOut, stickerById])

  function toggleGroup(g: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(g)) next.delete(g)
      else next.add(g)
      return next
    })
  }

  function switchTab(t: Tab) {
    setTab(t)
    setDismissed(new Set())
    setFadingOut(new Set())
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  function handleChipTap(s: StickerRow) {
    if (fadingOut.has(s.id) || dismissed.has(s.id)) return

    setFadingOut((prev) => new Set(prev).add(s.id))

    const cs = csMap.get(s.id)
    const qMe = (cs?.quantity_me ?? 0) + (auth?.role === 'owner' ? 1 : 0)
    const qBro = (cs?.quantity_brother ?? 0) + (auth?.role === 'partner' ? 1 : 0)

    supabase.from('collection_stickers').upsert(
      { collection_id: auth!.collectionId, sticker_id: s.id, quantity_me: qMe, quantity_brother: qBro },
      { onConflict: 'collection_id,sticker_id' }
    )

    showToast(`${s.id} registrada para ${profileName}`)

    setTimeout(() => {
      setFadingOut((prev) => { const n = new Set(prev); n.delete(s.id); return n })
      setDismissed((prev) => new Set(prev).add(s.id))
    }, 280)
  }

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-white text-xl font-bold">Checklist</h1>
          <p className="text-green-300 text-sm">Toque para registrar figurinha obtida</p>
        </div>
        <span className="bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full mt-1 whitespace-nowrap">
          EU — {profileName}
        </span>
      </div>

      <div className="flex gap-2 px-4 pt-3 pb-2">
        <button
          onClick={() => switchTab('missing')}
          className={`flex-1 py-2 rounded-full text-sm font-medium ${
            tab === 'missing' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Faltando
        </button>
        <button
          onClick={() => switchTab('duplicates')}
          className={`flex-1 py-2 rounded-full text-sm font-medium ${
            tab === 'duplicates' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Repetidas
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : grouped.length === 0 ? (
        <p className="text-center text-gray-400 py-12">
          {tab === 'missing' ? 'Nenhuma figurinha faltando!' : 'Nenhuma repetida ainda'}
        </p>
      ) : (
        <div className="px-4 space-y-2 pb-6 mt-1">
          {grouped.map(({ group, stickers }) => {
            const isOpen = openGroups.has(group)
            const visibleCount = stickers.filter((s) => !fadingOut.has(s.id)).length

            const byTeam = new Map<string, StickerRow[]>()
            for (const s of stickers) {
              if (!byTeam.has(s.team_id)) byTeam.set(s.team_id, [])
              byTeam.get(s.team_id)!.push(s)
            }

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
                    {(teamsByGroup[group] ?? []).map((tid) => (
                      <Flag key={tid} teamId={tid} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-bold rounded-full px-2 py-0.5">
                      {visibleCount}
                    </span>
                    <span className="text-gray-400">
                      <Chevron open={isOpen} />
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-3 pb-3 pt-2 space-y-3">
                    {Array.from(byTeam.entries()).map(([teamId, teamStickers]) => (
                      <div key={teamId}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Flag teamId={teamId} />
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {teamStickers[0]?.team_name}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {teamStickers.map((s) => {
                            const fading = fadingOut.has(s.id)
                            return (
                              <button
                                key={s.id}
                                onClick={() => handleChipTap(s)}
                                style={{
                                  opacity: fading ? 0 : 1,
                                  transform: fading ? 'scale(0.7)' : 'scale(1)',
                                  transition: 'opacity 0.25s, transform 0.25s',
                                  pointerEvents: fading ? 'none' : 'auto',
                                }}
                                className="bg-gray-100 hover:bg-green-100 active:bg-green-200 text-gray-700 text-xs font-mono font-medium rounded-lg px-2.5 py-1.5 border border-gray-200 hover:border-green-300"
                              >
                                {s.id}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 mt-1">
                      Registrado como {profileName} automaticamente
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
