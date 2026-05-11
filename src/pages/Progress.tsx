import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'

const TOTAL = 980

interface GroupProgress {
  group: string
  total: number
  collected: number
}

export default function Progress() {
  const { auth } = useAuth()
  const [overall, setOverall] = useState({ collected: 0, total: TOTAL })
  const [groups, setGroups] = useState<GroupProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return

    async function load() {
      const [teamsRes, stickersRes, collectionRes] = await Promise.all([
        supabase.from('teams').select('id, group'),
        supabase.from('stickers').select('id, team_id'),
        supabase
          .from('collection_stickers')
          .select('sticker_id')
          .eq('collection_id', auth!.collectionId)
          .eq('owned', true),
      ])

      const collectedIds = new Set((collectionRes.data || []).map((s) => s.sticker_id))
      const teamGroup: Record<string, string> = {}
      for (const t of teamsRes.data || []) teamGroup[t.id] = t.group

      const groupMap: Record<string, { total: number; collected: number }> = {}
      for (const s of stickersRes.data || []) {
        const g = teamGroup[s.team_id] || 'FWC'
        if (!groupMap[g]) groupMap[g] = { total: 0, collected: 0 }
        groupMap[g].total++
        if (collectedIds.has(s.id)) groupMap[g].collected++
      }

      const totalCollected = collectedIds.size
      setOverall({ collected: totalCollected, total: TOTAL })

      const groupList = Object.entries(groupMap)
        .map(([group, v]) => ({ group, ...v }))
        .sort((a, b) => {
          if (a.group === 'FWC') return -1
          if (b.group === 'FWC') return 1
          return a.group.localeCompare(b.group)
        })
      setGroups(groupList)
      setLoading(false)
    }

    load()
  }, [auth])

  const pct = Math.round((overall.collected / overall.total) * 100)

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-6">
        <h1 className="text-white text-xl font-bold">Progresso</h1>
        <div className="mt-4 text-center">
          <p className="text-5xl font-bold text-white">{pct}%</p>
          <p className="text-green-300 mt-1">{overall.collected} de {overall.total} figurinhas</p>
        </div>
        <div className="w-full bg-green-900 rounded-full h-3 mt-4">
          <div
            className="bg-white h-3 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="px-4 mt-4 pb-6 space-y-3">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Por grupo</p>
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          groups.map((g) => {
            const p = g.total > 0 ? Math.round((g.collected / g.total) * 100) : 0
            return (
              <div key={g.group} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    {g.group === 'FWC' ? 'Especiais FWC' : `Grupo ${g.group}`}
                  </span>
                  <span className="text-xs text-gray-500">{g.collected}/{g.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${p}%` }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
