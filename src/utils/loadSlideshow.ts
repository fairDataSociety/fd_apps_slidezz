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

  setSlides({
    data: template.innerHTML,
  })
}
