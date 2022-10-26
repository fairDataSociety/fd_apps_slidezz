import {
  GoogleSlides,
  PageElement,
  Size,
  Transform,
  VideoElement,
} from '../types/google-slides'

export function parseGoogleSlides(
  slidesImages: string[],
  googleSlides: GoogleSlides,
  pageSize: { width: number; height: number }
) {
  const revealSlides = document.createElement('template')

  const videos = extractVideos(googleSlides)

  for (const [i, slideImage] of slidesImages.entries()) {
    const revealSection = document.createElement('section')

    // Set Slide background
    revealSection.style.backgroundImage =
      'url(data:image/jpeg;base64,' + slideImage + ')'
    revealSection.style.backgroundSize = 'cover'
    revealSection.style.backgroundPosition = 'center'

    if (videos[i]) {
      for (const video of videos[i]) {
        revealSection.append(video)
      }
    }

    revealSection.setAttribute('data-width', String(pageSize.width))
    revealSection.setAttribute('data-height', String(pageSize.height))

    revealSlides.content.appendChild(revealSection)
  }

  return revealSlides.innerHTML
}

function extractVideos(googleSlides: GoogleSlides) {
  const videos: { [slideNumber: number]: HTMLIFrameElement[] } = {}

  const getSlideVideos = (pageElements: PageElement[], slideNumber: number) => {
    for (const pageElement of pageElements) {
      if (pageElement.video) {
        const iframe = videoElementToIFrame(pageElement as VideoElement)
        if (videos[slideNumber]) {
          videos[slideNumber].push(iframe)
        } else {
          videos[slideNumber] = [iframe]
        }
      }
      if (pageElement.elementGroup) {
        getSlideVideos(pageElement.elementGroup.children, slideNumber)
      }
    }
  }

  for (const [i, slide] of googleSlides.slides.entries()) {
    getSlideVideos(slide.pageElements, i)
  }

  return videos
}

function videoElementToIFrame(videoElement: VideoElement) {
  const iframe = document.createElement('iframe')

  const { top, left, width, height } = affineTransform(
    videoElement.transform,
    videoElement.size
  )
  iframe.style.position = 'absolute'
  iframe.style.top = top
  iframe.style.left = left
  iframe.style.width = width
  iframe.style.height = height
  iframe.title = videoElement.title || ''
  if (videoElement.video.source === 'YOUTUBE') {
    iframe.src = `https://www.youtube.com/embed/${videoElement.video.id}`
  } else {
    iframe.src = videoElement.video.url
  }

  return iframe
}

function affineTransform(transform: Transform, size: Size) {
  const { translateX, translateY, scaleX, scaleY, shearX, shearY } = {
    translateX: transform.translateX || 0,
    translateY: transform.translateY || 0,
    scaleX: transform.scaleX || 0,
    scaleY: transform.scaleY || 0,
    shearX: transform.shearX || 0,
    shearY: transform.shearY || 0,
  }

  return {
    width: `${Math.ceil((scaleX * size.width.magnitude) / 9525)}px`,
    height: `${Math.ceil((scaleY * size.height.magnitude) / 9525)}px`,
    top: `${Math.round(translateY / 9525)}px`,
    left: `${Math.round(translateX / 9525)}px`,
  }
}
