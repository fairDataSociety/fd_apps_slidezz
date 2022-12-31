import Reveal from 'reveal.js'

export function addTextToCurrentSlide(
  deck: Reveal.Api,
  setMoveableTargets: (target: HTMLElement[]) => void
) {
  const currentSlideIndex = deck.getState().indexh
  const slide = deck.getSlides()[currentSlideIndex]

  const textContainer = document.createElement('div')
  textContainer.classList.add('text-container', 'container')
  textContainer.innerHTML = '<p>Text</p>'

  slide.appendChild(textContainer)
  setMoveableTargets([textContainer])
}
