import { supabase } from './supabase'

export function insertHistory(params: {
  collectionId: string
  stickerCode: string
  stickerName: string
  action: 'added' | 'removed'
  actor: 'me' | 'brother'
}) {
  supabase.from('sticker_history').insert({
    collection_id: params.collectionId,
    sticker_code: params.stickerCode,
    sticker_name: params.stickerName,
    action: params.action,
    actor: params.actor,
  })
}
