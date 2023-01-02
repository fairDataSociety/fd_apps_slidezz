import Reveal from 'reveal.js'

export function removeCurrentSlide(deck: Reveal.Api) {
  if (deck.getTotalSlides() <= 1) return

  const slides = deck.getSlidesElement() as HTMLElement
  const currentSlide = deck.getCurrentSlide() as HTMLElement
  const currentSlideIndex = deck.getState().indexh

  slides.removeChild(currentSlide)
  deck.sync()
  deck.layout()
  deck.slide(deck.getTotalSlides() > 1 ? currentSlideIndex : 0)
}
