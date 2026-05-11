import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

const TOKEN_KEY = 'stickers_token'
const COLLECTION_KEY = 'stickers_collection_id'
const ROLE_KEY = 'stickers_role'

export type UserRole = 'owner' | 'partner'

export interface AuthState {
  token: string
  collectionId: string
  role: UserRole
}

export function getAuthState(): AuthState | null {
  const token = localStorage.getItem(TOKEN_KEY)
  const collectionId = localStorage.getItem(COLLECTION_KEY)
  const role = localStorage.getItem(ROLE_KEY) as UserRole | null
  if (!token || !collectionId || !role) return null
  return { token, collectionId, role }
}

export function saveAuthState(state: AuthState) {
  localStorage.setItem(TOKEN_KEY, state.token)
  localStorage.setItem(COLLECTION_KEY, state.collectionId)
  localStorage.setItem(ROLE_KEY, state.role)
}

export function clearAuthState() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(COLLECTION_KEY)
  localStorage.removeItem(ROLE_KEY)
}

export async function createCollection(): Promise<{
  ownerLink: string
  partnerLink: string
}> {
  const ownerToken = uuidv4()
  const partnerToken = uuidv4()

  const { data, error } = await supabase
    .from('collections')
    .insert({ owner_token: ownerToken, partner_token: partnerToken })
    .select('id')
    .single()

  if (error || !data) throw new Error('Falha ao criar coleção')

  const base = window.location.origin
  return {
    ownerLink: `${base}/?token=${ownerToken}`,
    partnerLink: `${base}/?token=${partnerToken}`,
  }
}

export async function resolveToken(token: string): Promise<AuthState | null> {
  const { data, error } = await supabase
    .from('collections')
    .select('id, owner_token, partner_token')
    .or(`owner_token.eq.${token},partner_token.eq.${token}`)
    .single()

  if (error || !data) return null

  const role: UserRole = data.owner_token === token ? 'owner' : 'partner'
  return { token, collectionId: data.id, role }
}
