import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import { calcExtras } from '../lib/extras'

const TOTAL_STICKERS = 980

interface Stats {
  collected: number
  duplicates: number
  missing: number
}

export default function Home() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats>({ collected: 0, duplicates: 0, missing: TOTAL_STICKERS })

  useEffect(() => {
    if (!auth) return

    async function fetchStats() {
      const { data, error } = await supabase
        .from('collection_stickers')
        .select('quantity_me, quantity_brother')
        .eq('collection_id', auth!.collectionId)

      if (error || !data) return

      const collected = data.filter((s) => s.quantity_me > 0 || s.quantity_brother > 0).length
      const duplicates = data.reduce((acc, s) => {
        const { extrasMe, extrasBro } = calcExtras(s.quantity_me, s.quantity_brother)
        return acc + extrasMe + extrasBro
      }, 0)
      setStats({ collected, duplicates, missing: TOTAL_STICKERS - collected })
    }

    fetchStats()

    const channel = supabase
      .channel(`stats-${auth.collectionId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'collection_stickers', filter: `collection_id=eq.${auth.collectionId}` },
        () => fetchStats()
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [auth])

  return (
    <div className="flex flex-col">
      <div className="bg-green-800 px-4 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h1 className="text-white text-xl font-bold">Copa 2026</h1>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-sm">MAG</div>
              <span className="text-green-300 text-xs mt-0.5">Maguto</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm">GAB</div>
              <span className="text-green-300 text-xs mt-0.5">Gabriel</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mx-4 -mt-3 rounded-2xl shadow p-4 flex divide-x divide-gray-100">
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-gray-800">{stats.collected}</p>
          <p className="text-xs text-gray-500 mt-0.5">Coletadas</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-red-500">{stats.duplicates}</p>
          <p className="text-xs text-gray-500 mt-0.5">Repetidas</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-gray-400">{stats.missing}</p>
          <p className="text-xs text-gray-500 mt-0.5">Faltando</p>
        </div>
      </div>

      <div className="px-4 mt-5">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${(stats.collected / TOTAL_STICKERS) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          {stats.collected} / {TOTAL_STICKERS} ({Math.round((stats.collected / TOTAL_STICKERS) * 100)}%)
        </p>
      </div>

      <div className="px-4 mt-6 space-y-3">
        <button
          onClick={() => navigate('/album')}
          className="w-full bg-green-700 text-white rounded-2xl p-4 flex items-center gap-4 shadow"
        >
          <span className="text-3xl">📖</span>
          <div className="text-left">
            <p className="font-semibold">Ver Álbum</p>
            <p className="text-green-200 text-sm">Marcar figurinhas por seleção</p>
          </div>
          <span className="ml-auto text-xl">›</span>
        </button>
        <button
          onClick={() => navigate('/trocas')}
          className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
        >
          <span className="text-3xl">🔄</span>
          <div className="text-left">
            <p className="font-semibold text-gray-800">Trocas</p>
            <p className="text-gray-500 text-sm">{stats.duplicates} figurinhas repetidas</p>
          </div>
          <span className="ml-auto text-gray-400 text-xl">›</span>
        </button>
      </div>
    </div>
  )
}
