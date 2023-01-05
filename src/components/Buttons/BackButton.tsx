import { useAtomValue } from 'jotai'
import { useResetAtom, useUpdateAtom } from 'jotai/utils'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

import {
  moveableHelperAtom,
  moveableTargetsAtom,
  redoHistoryStackAtom,
  slidesAtom,
  slidesDeckAtom,
  slidesLogoAtom,
  undoHistoryStackAtom,
} from '../../store'

export default function BackButton() {
  const setSlides = useUpdateAtom(slidesAtom)
  const setDeck = useUpdateAtom(slidesDeckAtom)
  const setSlidesLogo = useUpdateAtom(slidesLogoAtom)
  const setMoveableTargets = useUpdateAtom(moveableTargetsAtom)
  const restUndoHistoryStack = useResetAtom(undoHistoryStackAtom)
  const restRedoHistoryStack = useResetAtom(redoHistoryStackAtom)
  const moveableHelper = useAtomValue(moveableHelperAtom)

  return (
    <IconButton
      onClick={() => {
        setSlides(undefined)
        setDeck(undefined)
        setSlidesLogo(undefined)
        setMoveableTargets([])
        restRedoHistoryStack()
        restUndoHistoryStack()
        moveableHelper?.clear()
      }}
      aria-label="back"
      icon={<ArrowBackIcon />}
    />
  )
}
