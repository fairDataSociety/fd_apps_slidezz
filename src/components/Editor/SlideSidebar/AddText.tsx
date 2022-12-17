import { useAtom } from 'jotai'

import { Box } from '@chakra-ui/react'

import {
  editTextAtom,
  moveableTargetsAtom,
  slidesDeckAtom,
} from '../../../store'

interface AddTextProps {
  children?: React.ReactNode
}

export default function AddText({ children }: AddTextProps) {
  const [deck] = useAtom(slidesDeckAtom)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)
  const [, setEditText] = useAtom(editTextAtom)

  const handleAddText = () => {
    const currentSlideIndex = deck.getState().indexh
    const slide = deck.getSlides()[currentSlideIndex]

    const textContainer = document.createElement('div')
    textContainer.classList.add('fair-text', 'container')

    slide.appendChild(textContainer)

    setEditText({
      element: textContainer,
      callback: () => {
        setMoveableTargets([textContainer])
      },
    })
  }

  return <Box onClick={handleAddText}>{children}</Box>
}
