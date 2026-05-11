export function calcExtras(quantityMe: number, quantityBrother: number) {
  const extrasBro = Math.max(0, quantityBrother - 1)
  const extrasMe = quantityBrother >= 1 ? quantityMe : Math.max(0, quantityMe - 1)
  return { extrasMe, extrasBro }
}
