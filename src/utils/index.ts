import Reveal from 'reveal.js'

export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

export function getSlidesHTML(deck: Reveal.Api) {
  const slides = deck.getSlides()
  return slides.map((slide) => slide.outerHTML).join('\n')
}

export function hashCode(str: string) {
  let hash = 0
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return Math.abs(hash)
}

export function isHTML(data: string) {
  return /<\/?[a-z][\s\S]*>/i.test(data)
}

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

export function youtubeUrlParser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}
