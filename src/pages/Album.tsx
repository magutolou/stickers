import { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import type { Team } from '../lib/types'

interface TeamWithProgress extends Team {
  total: number
  collected: number
}

const GROUP_ORDER = ['FWC', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

const FLAG_EMOJI: Record<string, string> = {
  FWC: '🏟️',
}

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

const normalize = (str: string) =>
  str.normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[-\s]/g, '')
    .toLowerCase()

function FlagIcon({ teamId }: { teamId: string }) {
  const iso = ISO_CODE[teamId]
  if (!iso) return <span>{FLAG_EMOJI[teamId] || '🏳️'}</span>
  return <span className={`fi fi-${iso}`} style={{ fontSize: '0.9rem', borderRadius: '3px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }} />
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

export default function Album() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [teams, setTeams] = useState<TeamWithProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!auth) return

    async function load() {
      const [teamsRes, stickersRes, collectionRes] = await Promise.all([
        supabase.from('teams').select('*'),
        supabase.from('stickers').select('id, team_id'),
        supabase
          .from('collection_stickers')
          .select('sticker_id, owned')
          .eq('collection_id', auth!.collectionId)
          .eq('owned', true),
      ])

      if (!teamsRes.data) return

      const collectedIds = new Set((collectionRes.data || []).map((s) => s.sticker_id))
      const stickersByTeam: Record<string, string[]> = {}
      for (const s of stickersRes.data || []) {
        if (!stickersByTeam[s.team_id]) stickersByTeam[s.team_id] = []
        stickersByTeam[s.team_id].push(s.id)
      }

      const result: TeamWithProgress[] = teamsRes.data.map((t) => {
        const ids = stickersByTeam[t.id] || []
        return {
          ...t,
          total: ids.length,
          collected: ids.filter((id) => collectedIds.has(id)).length,
        }
      })

      setTeams(result)
      setLoading(false)
    }

    load()
  }, [auth])

  function openSearch() {
    setIsSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function closeSearch() {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const isSearchActive = isSearchOpen && searchQuery.trim().length > 0

  const displayTeams = useMemo(() => {
    if (!isSearchActive) return teams
    const nq = normalize(searchQuery)
    return teams.filter((t) => {
      const nName = normalize(t.name)
      const nId = normalize(t.id)
      return nName.includes(nq) || nId.startsWith(nq) || nq.startsWith(nId)
    })
  }, [teams, searchQuery, isSearchActive])

  const grouped = useMemo(() => {
    return GROUP_ORDER.reduce<Record<string, TeamWithProgress[]>>((acc, g) => {
      const list = displayTeams.filter((t) => t.group === g)
      if (list.length) acc[g] = list
      return acc
    }, {})
  }, [displayTeams])

  function toggleGroup(group: string) {
    if (isSearchActive) return
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }

  function isGroupOpen(group: string) {
    if (isSearchActive) return true
    return openGroups.has(group)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const fwcTeams = grouped['FWC']
  const regularGroups = Object.entries(grouped).filter(([g]) => g !== 'FWC')
  const totalFound = displayTeams.length

  return (
    <div className="pb-4">
      <div className="bg-green-800 px-4 pt-10 pb-4">
        {isSearchOpen ? (
          <div
            className="flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '7px 14px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-70">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="País ou código..."
              className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none"
            />
            <button onClick={closeSearch} className="text-white/70 hover:text-white shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white text-xl font-bold">Álbum</h1>
              <p className="text-green-300 text-sm">Copa do Mundo 2026</p>
            </div>
            <button onClick={openSearch} className="text-white/70 hover:text-white mt-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="px-4 mt-4 space-y-5">
        {isSearchActive && (
          <p className="text-xs text-gray-500 text-center -mt-2">
            {totalFound === 0
              ? 'Nenhuma figurinha encontrada'
              : totalFound === 1
              ? '1 país encontrado'
              : `${totalFound} países encontrados`}
          </p>
        )}

        {fwcTeams && (
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Especiais FWC</p>
            <div className="grid grid-cols-2 gap-2">
              {fwcTeams.map((team) => {
                const pct = team.total > 0 ? (team.collected / team.total) * 100 : 0
                return (
                  <button
                    key={team.id}
                    onClick={() => navigate(`/album/${team.id}`)}
                    className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-3 shadow-sm text-left"
                  >
                    <span className="text-2xl">{FLAG_EMOJI[team.id] || '🏳️'}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm truncate"
                        style={isSearchActive ? { fontWeight: 500, color: '#7a5200' } : { color: '#1f2937' }}
                      >
                        {team.name}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{team.collected}/{team.total}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {regularGroups.length > 0 && (
          <div>
            {!isSearchActive && (
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Grupos</p>
            )}
            <div className="space-y-2">
              {regularGroups.map(([group, list]) => {
                const isOpen = isGroupOpen(group)
                return (
                  <div key={group} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleGroup(group)}
                      className="w-full grid items-center px-4 py-3"
                      style={{ gridTemplateColumns: 'auto 1fr auto' }}
                    >
                      <span className="font-semibold text-gray-800 text-sm">Grupo {group}</span>
                      <div className="flex items-center justify-center gap-1.5">
                        {list.map((team) => (
                          <FlagIcon key={team.id} teamId={team.id} />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {list.reduce((s, t) => s + t.collected, 0)}/{list.reduce((s, t) => s + t.total, 0)}
                        </span>
                        {!isSearchActive && (
                          <span className="text-gray-400">
                            <Chevron open={isOpen} />
                          </span>
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-3 pb-3 grid grid-cols-2 gap-2 border-t border-gray-100">
                        {list.map((team) => {
                          const pct = team.total > 0 ? (team.collected / team.total) * 100 : 0
                          return (
                            <button
                              key={team.id}
                              onClick={() => navigate(`/album/${team.id}`)}
                              className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3 text-left mt-2"
                            >
                              <FlagIcon teamId={team.id} />
                              <div className="flex-1 min-w-0">
                                <p
                                  className="font-semibold text-sm truncate"
                                  style={isSearchActive ? { fontWeight: 500, color: '#7a5200' } : { color: '#1f2937' }}
                                >
                                  {team.name}
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{team.collected}/{team.total}</p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {isSearchActive && totalFound === 0 && (
          <p className="text-center text-gray-400 py-12">Nenhuma figurinha encontrada</p>
        )}
      </div>
    </div>
  )
}
