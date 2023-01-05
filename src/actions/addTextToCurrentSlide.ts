import Reveal from 'reveal.js'

import { HistoryAction, HistoryActionType } from '../store'

export function addTextToCurrentSlide(
  deck: Reveal.Api,
  setMoveableTargets: (target: HTMLElement[]) => void,
  addHistoryAction: (action: HistoryAction) => void
) {
  const currentSlideIndex = deck.getState().indexh
  const slide = deck.getSlides()[currentSlideIndex]

  const textContainer = document.createElement('div')
  textContainer.classList.add('text-container', 'container')
  textContainer.innerHTML = '<p>Text</p>'

  slide.appendChild(textContainer)
  setMoveableTargets([textContainer])
  addHistoryAction({
    type: HistoryActionType.AddElement,
    element: textContainer,
    slide: currentSlideIndex,
  })
}
