import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'

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
  const [, setSlides] = useAtom(slidesAtom)
  const [, setDeck] = useAtom(slidesDeckAtom)
  const [, setSlidesLogo] = useAtom(slidesLogoAtom)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)
  const restUndoHistoryStack = useResetAtom(undoHistoryStackAtom)
  const restRedoHistoryStack = useResetAtom(redoHistoryStackAtom)
  const [moveableHelper] = useAtom(moveableHelperAtom)

  return (
    <IconButton
      onClick={() => {
        setSlides(undefined)
        setDeck(undefined)
        setSlidesLogo(undefined)
        setMoveableTargets([])
        restRedoHistoryStack()
        restUndoHistoryStack()
        moveableHelper.clear()
      }}
      aria-label="back"
      icon={<ArrowBackIcon />}
    />
  )
}
