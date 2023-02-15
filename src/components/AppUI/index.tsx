import { useColors } from 'catppuccin-chakra-ui-theme'

import { Box, HStack, Image } from '@chakra-ui/react'

export default function AppUI() {
  const { crust } = useColors()

  return (
    <Box w={{ base: '100%', lg: '90%' }} bg={crust} rounded="md" boxShadow="lg">
      <HStack p={2}>
        <Circle />
        <Circle />
        <Circle />
      </HStack>

      <Box pb="50%" h={0} position="relative">
        <Image
          display="block"
          position="absolute"
          alt="app screenshot"
          pb={2}
          boxSize="full"
          objectFit="contain"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/app-screenshot.png`}
        />
      </Box>
    </Box>
  )
}

const Circle = () => {
  const { subtext0 } = useColors()
  return <Box w="0.5rem" h="0.5rem" rounded="full" bg={subtext0}></Box>
}
