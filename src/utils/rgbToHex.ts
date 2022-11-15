export function rgbToHex(rgb: string) {
  const reg = new RegExp(/rgb\((\d*), (\d*), (\d*)\)/)
  const rgbArray = reg.exec(rgb)

  if (!rgbArray) return rgb

  const [, r, g, b] = rgbArray

  return (
    '#' +
    ((1 << 24) | (Number(r) << 16) | (Number(g) << 8) | Number(b))
      .toString(16)
      .slice(1)
  )
}
