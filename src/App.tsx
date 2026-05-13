import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getAuthState, resolveToken, saveAuthState, type AuthState } from './lib/auth'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Album from './pages/Album'
import Section from './pages/Section'
import Checklist from './pages/Checklist'
import Config from './pages/Config'
import Layout from './components/Layout'

interface AuthCtx {
  auth: AuthState | null
  setAuth: (a: AuthState | null) => void
}

export const AuthCtxContext = createContext<AuthCtx>({ auth: null, setAuth: () => {} })
export const useAuth = () => useContext(AuthCtxContext)

function App() {
  const [auth, setAuth] = useState<AuthState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const params = new URLSearchParams(window.location.search)
      const tokenFromUrl = params.get('token')

      if (tokenFromUrl) {
        const resolved = await resolveToken(tokenFromUrl)
        if (resolved) {
          saveAuthState(resolved)
          setAuth(resolved)
          window.history.replaceState({}, '', '/')
        }
      } else {
        const stored = getAuthState()
        if (stored) setAuth(stored)
      }
      setLoading(false)
    }
    init()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-900">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <AuthCtxContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Routes>
          {!auth ? (
            <>
              <Route path="/" element={<Welcome />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/album" element={<Album />} />
              <Route path="/album/:teamId" element={<Section />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/config" element={<Config />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </AuthCtxContext.Provider>
  )
}

export default App
