import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      teams: {
        Row: { id: string; name: string; group: string }
      }
      stickers: {
        Row: {
          id: string
          team_id: string
          number: number
          player_name: string
          is_special: boolean
        }
      }
      collections: {
        Row: {
          id: string
          created_at: string
          owner_token: string
          partner_token: string
        }
      }
      collection_stickers: {
        Row: {
          collection_id: string
          sticker_id: string
          owned: boolean
          quantity_me: number
          quantity_brother: number
        }
      }
    }
  }
}
