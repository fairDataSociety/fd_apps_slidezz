import { useAtom } from 'jotai'

import { Box } from '@chakra-ui/react'

import { addTextToCurrentSlide } from '../../../actions/addTextToCurrentSlide'
import { moveableTargetsAtom, slidesDeckAtom } from '../../../store'

interface AddTextProps {
  children?: React.ReactNode
}

export default function AddText({ children }: AddTextProps) {
  const [deck] = useAtom(slidesDeckAtom)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)

  return (
    <Box
      onClick={() => {
        if (!deck) return
        addTextToCurrentSlide(deck, setMoveableTargets)
      }}
    >
      {children}
    </Box>
  )
}
