import { downloadFile } from '../api/fs'
import { openPod } from '../api/pod'
import { LogoImageFile, Slides, User } from '../types'

export async function loadSlideshow(
  user: User,
  file: { data: Blob } | undefined,
  setSlides: (slides: Slides) => void,
  setSlidesLogo?: (logoFile: LogoImageFile) => void
) {
  if (!file) return

  const template = document.createElement('template')
  template.innerHTML = await file.data.text()

  const logoImageElement = template.content.querySelector('.logo-image')

  if (logoImageElement && setSlidesLogo) {
    const podName = logoImageElement.getAttribute('data-pod')!
    const fullPath = logoImageElement.getAttribute('data-path')!

    await openPod(podName, user.password)

    const data = await downloadFile({ pod_name: podName, file_path: fullPath })

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
