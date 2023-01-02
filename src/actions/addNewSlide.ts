import Reveal from 'reveal.js'

export function addNewSlide(deck: Reveal.Api, content?: string) {
  const sectionElement = document.createElement('section')
  sectionElement.innerHTML =
    typeof content === 'string' ? content : deck.getCurrentSlide().innerHTML

  const currentSlideIndex = deck.getState().indexh
  const currentSlide = deck.getCurrentSlide()
  const slidesLen = deck.getTotalSlides()
  const slides = deck.getSlidesElement()

  //append to the end
  if (currentSlideIndex === slidesLen - 1) slides.appendChild(sectionElement)
  else slides.insertBefore(sectionElement, currentSlide.nextSibling)

  deck.sync()
  deck.layout()
  deck.next()
}
