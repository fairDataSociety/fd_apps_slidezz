import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { fairDriveDownloadShared } from '../fairdrive'
import { Slides, SlidesLogo, User } from '../types'

export async function importSharedSlides(
  slidesShareRef: string,
  setSlides: (slides: Slides) => void,
  setSlidesLogo?: (logo: SlidesLogo) => void,
  fdp?: FdpStorage,
  user?: User
) {
  const slidesHTML = await (
    await fairDriveDownloadShared(slidesShareRef, fdp, user?.password)
  ).text()

  const div = document.createElement('div')
  div.innerHTML = slidesHTML

  const logoImageElement = div.querySelector('.logo-image')
  if (logoImageElement && setSlidesLogo) {
    const data = logoImageElement.getAttribute('data-base64') as string
    setSlidesLogo({
      data,
    })
    div.removeChild(logoImageElement)
  }

  const firstSection = div.querySelector('section')
  const width = firstSection?.getAttribute('data-width')
  const height = firstSection?.getAttribute('data-height')

  const sharingOptions = div.querySelector('.sharing-options') as HTMLElement
  const allowDownloading =
    sharingOptions.getAttribute('data-allow-downloading') === 'true'
      ? true
      : false

  div.removeChild(sharingOptions)

  setSlides({
    data: div.innerHTML,
    width: width ? Number(width) : undefined,
    height: height ? Number(height) : undefined,
    isReadonly: true,
    sharingInfo: {
      sharedRef: slidesShareRef,
      allowDownloading,
    },
  })
}
