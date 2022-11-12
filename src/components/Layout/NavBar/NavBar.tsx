import { useAtom } from 'jotai'
import { IoLogoGithub } from 'react-icons/io5'

import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  HStack,
  IconButton,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  moveableTargetAtom,
  slidesAtom,
  slidesDeckAtom,
  slidesLogoAtom,
} from '../../../store'
import ThemeToggleButton from './ThemeToggleButton'

export default function NavBar() {
  //TODO: remove back button for shared slides
  const [slides, setSlides] = useAtom(slidesAtom)
  const setDeck = useAtom(slidesDeckAtom)[1]
  const setSlidesLogo = useAtom(slidesLogoAtom)[1]
  const setMoveableTarget = useAtom(moveableTargetAtom)[1]

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
        {slides && (
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
        )}

        <Text fontSize="2xl" fontWeight="bold">
          Slide
          <Text
            as="span"
            color={useColorModeValue('latte-rosewater', 'frappe-rosewater')}
          >
            zz
          </Text>
        </Text>
      </HStack>
    </HStack>
  )
}
