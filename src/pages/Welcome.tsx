import { useState } from 'react'
import { useAuth } from '../App'
import { createCollection, resolveToken, saveAuthState } from '../lib/auth'

export default function Welcome() {
  const { setAuth } = useAuth()
  const [mode, setMode] = useState<'menu' | 'create' | 'enter'>('menu')
  const [links, setLinks] = useState<{ ownerLink: string; partnerLink: string } | null>(null)
  const [tokenInput, setTokenInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate() {
    setLoading(true)
    setError('')
    try {
      const result = await createCollection()
      setLinks(result)
      setMode('create')
      const token = new URL(result.ownerLink).searchParams.get('token')!
      const resolved = await resolveToken(token)
      if (resolved) {
        saveAuthState(resolved)
        setAuth(resolved)
      }
    } catch {
      setError('Erro ao criar coleção. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }

  async function handleEnter() {
    setLoading(true)
    setError('')
    try {
      let token = tokenInput.trim()
      if (token.includes('token=')) {
        token = new URL(token).searchParams.get('token') || token
      }
      const resolved = await resolveToken(token)
      if (!resolved) {
        setError('Link inválido. Verifique e tente novamente.')
        return
      }
      saveAuthState(resolved)
      setAuth(resolved)
    } catch {
      setError('Link inválido. Verifique e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🏆</div>
        <h1 className="text-white text-3xl font-bold">Copa 2026</h1>
        <p className="text-green-200 mt-2">Álbum de figurinhas compartilhado</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
        {mode === 'menu' && (
          <div className="space-y-3">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-base disabled:opacity-50"
            >
              {loading ? 'Criando...' : '✨ Criar nova coleção'}
            </button>
            <button
              onClick={() => setMode('enter')}
              className="w-full border-2 border-green-700 text-green-700 py-3 rounded-xl font-semibold text-base"
            >
              🔗 Entrar com meu link
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        )}

        {mode === 'create' && links && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-center">Coleção criada! 🎉</h2>
            <p className="text-sm text-gray-600 text-center">
              Você já está logado. Salve o link do seu irmão e envie para ele.
            </p>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-blue-600 font-semibold mb-1">Link do irmão:</p>
              <p className="text-xs break-all text-gray-700">{links.partnerLink}</p>
              <button
                onClick={() => navigator.clipboard.writeText(links.partnerLink)}
                className="mt-2 w-full text-xs bg-blue-600 text-white py-1.5 rounded-lg"
              >
                Copiar link
              </button>
            </div>
          </div>
        )}

        {mode === 'enter' && (
          <div className="space-y-3">
            <button
              onClick={() => setMode('menu')}
              className="text-sm text-gray-500"
            >
              ← Voltar
            </button>
            <h2 className="font-bold text-lg">Cole seu link de acesso</h2>
            <textarea
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="https://app.com/?token=..."
              className="w-full border border-gray-300 rounded-xl p-3 text-sm resize-none h-20"
            />
            <button
              onClick={handleEnter}
              disabled={loading || !tokenInput.trim()}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
