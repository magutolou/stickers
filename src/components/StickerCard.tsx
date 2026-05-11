import type { StickerWithStatus } from '../lib/types'
import { calcExtras } from '../lib/extras'

interface Props {
  sticker: StickerWithStatus
  onClick: () => void
}

function getStyle(s: StickerWithStatus): { card: string; text: string } {
  const me = s.quantity_me ?? 0
  const bro = s.quantity_brother ?? 0
  const total = me + bro

  if (total === 0)              return { card: 'bg-gray-100 border-gray-200',    text: 'text-gray-400' }
  if (total > 1)                return { card: 'bg-red-50 border-red-400',       text: 'text-red-700' }
  if (me === 1)                 return { card: 'bg-orange-50 border-orange-400', text: 'text-orange-800' }
  return                               { card: 'bg-blue-50 border-blue-400',     text: 'text-blue-800' }
}

export default function StickerCard({ sticker, onClick }: Props) {
  const { card, text } = getStyle(sticker)
  const me = sticker.quantity_me ?? 0
  const bro = sticker.quantity_brother ?? 0
  const { extrasMe, extrasBro } = calcExtras(me, bro)
  const badge = extrasMe + extrasBro

  return (
    <button
      onClick={onClick}
      className={`relative border-2 rounded-xl p-2 flex flex-col items-center gap-0.5 ${card} active:scale-95 transition-transform`}
    >
      {badge > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold leading-none">
          {badge}
        </span>
      )}
      <span className={`text-xs font-bold ${text}`}>{sticker.id.replace('-', '')}</span>
      <span className={`text-xs ${text} text-center leading-tight line-clamp-2 max-w-full`}>
        {sticker.player_name}
      </span>
    </button>
  )
}
