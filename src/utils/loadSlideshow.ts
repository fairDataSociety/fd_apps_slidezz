import { downloadFile } from '../api/fs'
import { File, LogoImageFile, Slides } from '../types'

export async function loadSlideshow(
  file: File | undefined,
  setSlides: (slides: Slides) => void,
  setSlidesLogo?: (logoFile: LogoImageFile) => void
) {
  if (!file) return

  const template = document.createElement('template')
  template.innerHTML = await file.data.text()

  const fairData = Array.from(template.content.querySelectorAll('.fair-data'))

  for await (const element of fairData) {
    const podName = element.getAttribute('data-pod')
    const path = element.getAttribute('data-path')

    if (podName && path) {
      try {
        const data = await downloadFile({ pod_name: podName, file_path: path })
        //@ts-ignore
        element.src = URL.createObjectURL(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const logoImageElement = template.querySelector('.logo-image')
  if (logoImageElement && setSlidesLogo) {
    const podName = logoImageElement.getAttribute('data-pod')!
    const fullPath = logoImageElement.getAttribute('data-path')!
    const data = await downloadFile({ pod_name: podName, file_path: fullPath })

    setSlidesLogo({
      data,
      podName,
      fullPath,
    })
    template.removeChild(logoImageElement)
  }

  setSlides({
    data: template.innerHTML,
  })
}
