import { useAtom } from 'jotai'
import { IoLogoGithub } from 'react-icons/io5'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Link, Text } from '@chakra-ui/react'

import useColors from '../../../hooks/useColors'
import {
  moveableTargetAtom,
  slidesAtom,
  slidesDeckAtom,
  slidesLogoAtom,
} from '../../../store'
import ThemeToggleButton from './ThemeToggleButton'

export default function NavBar() {
  const [slides, setSlides] = useAtom(slidesAtom)
  const [, setDeck] = useAtom(slidesDeckAtom)
  const [, setSlidesLogo] = useAtom(slidesLogoAtom)
  const [, setMoveableTarget] = useAtom(moveableTargetAtom)
  const { rosewater } = useColors()

  return (
    <HStack
      justify="space-between"
      fontSize="lg"
      gap={10}
      flexDir="row-reverse"
      py={4}
      px={5}
    >
      <HStack gap={5}>
        <Link
          href="https://github.com/soheil555/fairdrive-apps-slideshow"
          isExternal
        >
          <HStack>
            <IoLogoGithub /> <span>Github</span>
          </HStack>
        </Link>
        <ThemeToggleButton />
      </HStack>

      <HStack gap={2}>
        {slides && !slides.isReadonly ? (
          <IconButton
            onClick={() => {
              setSlides(undefined)
              setDeck(undefined)
              setSlidesLogo(undefined)
              setMoveableTarget(undefined)
            }}
            aria-label="back"
            icon={<ArrowBackIcon />}
          />
        ) : null}

        <Text fontSize="2xl" fontWeight="bold">
          Slide
          <Text as="span" color={rosewater}>
            zz
          </Text>
        </Text>
      </HStack>
    </HStack>
  )
}
