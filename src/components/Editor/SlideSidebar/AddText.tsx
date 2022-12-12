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

    const textElement = document.createElement('p')
    textElement.style.fontSize = '50px'
    textElement.innerText = 'text'
    textElement.spellcheck = false
    textElement.classList.add('fair-text')
    textElement.contentEditable = 'false'

    textElement.addEventListener('blur', () => {
      textElement.contentEditable = 'false'
    })

    slide.appendChild(textElement)

    setMoveableTargets([textElement])
  }

  return <Box onClick={handleAddText}>{children}</Box>
}
