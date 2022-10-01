import { FdpStorage } from '@fairdatasociety/fdp-storage'
import { File, LogoImageFile, Slides } from '../types'

export async function loadSlideshow(
  file: File | undefined,
  fdp: FdpStorage,
  setSlides: (slides: Slides) => void,
  setSlidesLogo?: (logoFile: LogoImageFile) => void
) {
  if (!file) return

  const template = document.createElement('template')
  template.innerHTML = file.data.text()

  const fairData = Array.from(template.content.querySelectorAll('.fair-data'))

  for await (const element of fairData) {
    const podName = element.getAttribute('data-pod')
    const path = element.getAttribute('data-path')

    if (podName && path) {
      try {
        const data = await fdp.file.downloadData(podName, path)
        //@ts-ignore
        element.src = URL.createObjectURL(new Blob([data.buffer]))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const logoImageElement = template.content.querySelector('.logo-image')
  if (logoImageElement && setSlidesLogo) {
    const podName = logoImageElement.getAttribute('data-pod')!
    const fullPath = logoImageElement.getAttribute('data-path')!
    const data = await fdp.file.downloadData(podName, fullPath)

    setSlidesLogo({
      data,
      podName,
      fullPath,
    })
    template.content.removeChild(logoImageElement)
  }

  setSlides({
    data: template.innerHTML,
  })
}
