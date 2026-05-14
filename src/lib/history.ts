import { supabase } from './supabase'

export function insertHistory(params: {
  collectionId: string
  stickerCode: string
  stickerName: string
  action: 'added' | 'removed'
  actor: 'me' | 'brother'
}) {
  console.log('[history] chamando insert', params)
  supabase.from('sticker_history').insert({
    collection_id: params.collectionId,
    sticker_code: params.stickerCode,
    sticker_name: params.stickerName,
    action: params.action,
    actor: params.actor,
  }).then(({ error }) => {
    if (error) console.error('[history] erro', error)
    else console.log('[history] inserido com sucesso')
  })
}
