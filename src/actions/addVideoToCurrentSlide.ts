import Reveal from 'reveal.js'

import { File } from '../types'
import { blobToBase64 } from '../utils'

export async function addVideoToCurrentSlide(
  video: File,
  deck: Reveal.Api,
  setMoveableTargets: (target: HTMLElement[]) => void
) {
  const currentSlideIndex = deck.getState().indexh
  const slide = deck.getSlides()[currentSlideIndex]

  const videoContainer = document.createElement('div')
  videoContainer.classList.add('container', 'media-container')

  const videoElement = document.createElement('video')
  const soruceElement = document.createElement('source')

  videoElement.controls = true
  soruceElement.src = await blobToBase64(video.data)

  videoElement.appendChild(soruceElement)
  videoContainer.appendChild(videoElement)
  slide.appendChild(videoContainer)

  setMoveableTargets([videoContainer])
}
