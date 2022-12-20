import { IoLogoGithub } from 'react-icons/io5'

import { HStack, Link, Text } from '@chakra-ui/react'

import useColors from '../../hooks/useColors'
import ThemeToggleButton from '../Buttons/ThemeToggleButton'

export default function Navbar() {
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

      <Text fontSize="2xl" fontWeight="bold">
        Slide
        <Text as="span" color={rosewater}>
          zz
        </Text>
      </Text>
    </HStack>
  )
}
