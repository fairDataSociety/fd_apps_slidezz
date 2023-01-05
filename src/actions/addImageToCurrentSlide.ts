import Reveal from 'reveal.js'

import { HistoryAction, HistoryActionType } from '../store'
import { File } from '../types'
import { blobToBase64 } from '../utils'

export async function addImageToCurrentSlide(
  image: File,
  deck: Reveal.Api,
  setMoveableTargets: (target: HTMLElement[]) => void,
  addHistoryAction: (action: HistoryAction) => void
) {
  const currentSlideIndex = deck.getState().indexh
  const slide = deck.getSlides()[currentSlideIndex]

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('container', 'media-container')

  const imageElement = document.createElement('img')
  imageElement.src = await blobToBase64(image.data)
  imageElement.alt = image.name

  imageContainer.appendChild(imageElement)

  slide.appendChild(imageContainer)
  setMoveableTargets([imageContainer])

  addHistoryAction({
    type: HistoryActionType.AddElement,
    element: imageContainer,
    slide: currentSlideIndex,
  })
}
