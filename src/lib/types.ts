export interface Team {
  id: string
  name: string
  group: string
}

export interface Sticker {
  id: string
  team_id: string
  number: number
  player_name: string
  is_special: boolean
}

export interface CollectionSticker {
  collection_id: string
  sticker_id: string
  owned: boolean
  quantity_me: number
  quantity_brother: number
}

export type StickerWithStatus = Sticker & Partial<CollectionSticker>

export type StickerFilter = 'all' | 'mine' | 'brother' | 'duplicates' | 'missing'
