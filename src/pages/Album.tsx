import { useEffect, useState } from 'react'
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

function FlagIcon({ teamId }: { teamId: string }) {
  const iso = ISO_CODE[teamId]
  if (!iso) return <span>{FLAG_EMOJI[teamId] || '🏳️'}</span>
  return <span className={`fi fi-${iso}`} style={{ fontSize: '1.25rem', borderRadius: '2px' }} />
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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

  const grouped = GROUP_ORDER.reduce<Record<string, TeamWithProgress[]>>((acc, g) => {
    const list = teams.filter((t) => t.group === g)
    if (list.length) acc[g] = list
    return acc
  }, {})

  function toggleGroup(group: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
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

  return (
    <div className="pb-4">
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Álbum</h1>
        <p className="text-green-300 text-sm">Copa do Mundo 2026</p>
      </div>

      <div className="px-4 mt-4 space-y-5">
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
                      <p className="font-semibold text-sm text-gray-800 truncate">{team.name}</p>
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
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Grupos</p>
            <div className="space-y-2">
              {regularGroups.map(([group, list]) => {
                const isOpen = openGroups.has(group)
                return (
                  <div key={group} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleGroup(group)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left"
                    >
                      <span className="font-semibold text-gray-800 text-sm w-16 shrink-0">Grupo {group}</span>
                      <div className="flex-1 flex items-center gap-1.5">
                        {list.map((team) => (
                          <FlagIcon key={team.id} teamId={team.id} />
                        ))}
                      </div>
                      <span className="text-gray-400 shrink-0">
                        <Chevron open={isOpen} />
                      </span>
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
                                <p className="font-semibold text-sm text-gray-800 truncate">{team.name}</p>
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
      </div>
    </div>
  )
}
