import { useAtom } from 'jotai'

import { Box } from '@chakra-ui/react'

import { moveableTargetsAtom, slidesDeckAtom } from '../../../store'

interface AddTextProps {
  children?: React.ReactNode
}

export default function AddText({ children }: AddTextProps) {
  const [deck] = useAtom(slidesDeckAtom)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)

  const handleAddText = () => {
    const currentSlideIndex = deck.getState().indexh
    const slide = deck.getSlides()[currentSlideIndex]

    const textContainer = document.createElement('div')
    textContainer.classList.add('fair-text', 'container')
    textContainer.innerHTML = '<p>Text</p>'

    slide.appendChild(textContainer)
    setMoveableTargets([textContainer])
  }

  return <Box onClick={handleAddText}>{children}</Box>
}
