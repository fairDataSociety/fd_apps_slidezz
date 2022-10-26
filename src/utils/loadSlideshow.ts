import { Slides } from '../types'

export async function loadSlideshow(
  file: { data: Blob } | undefined,
  setSlides: (slides: Slides) => void,
  setSlidesLogo?: (logoFile: { data: string }) => void
) {
  if (!file) return

  const template = document.createElement('template')
  template.innerHTML = await file.data.text()

  const logoImageElement = template.content.querySelector('.logo-image')

  if (logoImageElement && setSlidesLogo) {
    const data = logoImageElement.getAttribute('data-base64') as string
    setSlidesLogo({
      data,
    })
    template.content.removeChild(logoImageElement)
  }

  const firstSection = template.content.querySelector('section')
  const width = firstSection?.getAttribute('data-width')
  const height = firstSection?.getAttribute('data-height')

  setSlides({
    data: template.innerHTML,
    width: width ? Number(width) : undefined,
    height: height ? Number(height) : undefined,
  })
}
