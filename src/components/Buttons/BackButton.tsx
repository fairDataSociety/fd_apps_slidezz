import { useAtom } from 'jotai'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

import {
  moveableTargetsAtom,
  slidesAtom,
  slidesDeckAtom,
  slidesLogoAtom,
} from '../../store'

export default function BackButton() {
  const [, setSlides] = useAtom(slidesAtom)
  const [, setDeck] = useAtom(slidesDeckAtom)
  const [, setSlidesLogo] = useAtom(slidesLogoAtom)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)

  return (
    <IconButton
      onClick={() => {
        setSlides(undefined)
        setDeck(undefined)
        setSlidesLogo(undefined)
        setMoveableTargets([])
      }}
      aria-label="back"
      icon={<ArrowBackIcon />}
    />
  )
}
