export function getSlidesHTML(deck: any) {
  const slides = deck.getSlides() as HTMLElement[]
  return slides.map((slide) => slide.outerHTML).join('\n')
}
