import { useAtom } from 'jotai'
import { AiFillDelete } from 'react-icons/ai'

import { slidesDeckAtom } from '../../../store'
import SlideSideBarItem from './SlideSidebarItem'

export default function RemoveSlide() {
  const [deck] = useAtom(slidesDeckAtom)

  return (
    <SlideSideBarItem
      icon={AiFillDelete}
      label="Remove slide"
      onClick={() => {
        if (deck.getTotalSlides() <= 1) return

        const slides = deck.getSlidesElement() as HTMLElement
        const currentSlide = deck.getCurrentSlide() as HTMLElement
        const currentSlideIndex = deck.getState().indexh

        slides.removeChild(currentSlide)
        deck.sync()
        deck.layout()
        deck.slide(deck.getTotalSlides() > 1 ? currentSlideIndex : 0)
      }}
    />
  )
}
