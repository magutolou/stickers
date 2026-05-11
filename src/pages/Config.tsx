import { useEffect, useState } from 'react'
import { useAuth } from '../App'
import { clearAuthState } from '../lib/auth'
import { supabase } from '../lib/supabase'

export default function Config() {
  const { auth, setAuth } = useAuth()
  const [copied, setCopied] = useState<'mine' | 'partner' | null>(null)
  const [partnerLink, setPartnerLink] = useState<string | null>(null)

  useEffect(() => {
    if (!auth) return
    supabase
      .from('collections')
      .select('owner_token, partner_token')
      .eq('id', auth.collectionId)
      .single()
      .then(({ data }) => {
        if (!data) return
        const partnerToken = auth.role === 'owner' ? data.partner_token : data.owner_token
        setPartnerLink(`${window.location.origin}/?token=${partnerToken}`)
      })
  }, [auth])

  if (!auth) return null

  const myLink = `${window.location.origin}/?token=${auth.token}`

  async function copyLink(text: string, which: 'mine' | 'partner') {
    await navigator.clipboard.writeText(text)
    setCopied(which)
    setTimeout(() => setCopied(null), 2000)
  }

  function handleLogout() {
    clearAuthState()
    setAuth(null)
  }

  return (
    <div>
      <div className="bg-green-800 px-4 pt-10 pb-4">
        <h1 className="text-white text-xl font-bold">Configurações</h1>
      </div>

      <div className="px-4 mt-5 space-y-4 pb-6">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Meu link de acesso</p>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
                EU
              </div>
              <span className="font-semibold text-gray-800">Você ({auth.role === 'owner' ? 'Dono' : 'Parceiro'})</span>
            </div>
            <p className="text-xs text-gray-500 break-all mb-3">{myLink}</p>
            <button
              onClick={() => copyLink(myLink, 'mine')}
              className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold"
            >
              {copied === 'mine' ? '✅ Copiado!' : '📋 Copiar meu link'}
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Link do irmão</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold">
                IR
              </div>
              <span className="font-semibold text-gray-800">Irmão</span>
            </div>
            {partnerLink ? (
              <>
                <p className="text-xs text-gray-500 break-all mb-3">{partnerLink}</p>
                <button
                  onClick={() => copyLink(partnerLink, 'partner')}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold"
                >
                  {copied === 'partner' ? '✅ Copiado!' : '📋 Copiar link do irmão'}
                </button>
              </>
            ) : (
              <p className="text-xs text-gray-400">Carregando...</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full border border-red-300 text-red-500 py-3 rounded-xl text-sm font-semibold"
          >
            🚪 Sair desta coleção
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Você pode voltar a qualquer momento usando seu link de acesso.
          </p>
        </div>
      </div>
    </div>
  )
}
