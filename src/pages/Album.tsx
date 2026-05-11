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

export default function Album() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [teams, setTeams] = useState<TeamWithProgress[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pb-4">
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Álbum</h1>
        <p className="text-green-300 text-sm">Copa do Mundo 2026</p>
      </div>

      <div className="px-4 mt-4 space-y-5">
        {Object.entries(grouped).map(([group, list]) => (
          <div key={group}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              {group === 'FWC' ? 'Especiais FWC' : `Grupo ${group}`}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {list.map((team) => {
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
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {team.collected}/{team.total}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
