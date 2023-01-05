import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { Box } from '@chakra-ui/react'

import { addTextToCurrentSlide } from '../../../actions/addTextToCurrentSlide'
import {
  addHistoryActionAtom,
  moveableTargetsAtom,
  slidesDeckAtom,
} from '../../../store'

interface AddTextProps {
  children?: React.ReactNode
}

export default function AddText({ children }: AddTextProps) {
  const deck = useAtomValue(slidesDeckAtom)
  const setMoveableTargets = useUpdateAtom(moveableTargetsAtom)
  const addHistoryAction = useUpdateAtom(addHistoryActionAtom)

  return (
    <Box
      onClick={() => {
        if (!deck) return
        addTextToCurrentSlide(deck, setMoveableTargets, addHistoryAction)
      }}
    >
      {children}
    </Box>
  )
}
