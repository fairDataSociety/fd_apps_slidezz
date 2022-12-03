import { Box, HStack, Image } from '@chakra-ui/react'

import useColors from '../../hooks/useColors'

export default function AppUI() {
  const { crust } = useColors()

  return (
    <Box w={{ base: '100%', lg: '90%' }} bg={crust} rounded="md" boxShadow="lg">
      <HStack p={2}>
        <Circle />
        <Circle />
        <Circle />
      </HStack>

      <Box w="full" px={2} py={2}>
        <Image
          alt="app screenshot"
          h="full"
          objectFit="contain"
          src={`${window._detectedSiteType.basePath}/images/app-screenshot.png`}
        />
      </Box>
    </Box>
  )
}

const Circle = () => {
  const { subtext0 } = useColors()
  return <Box w="0.5rem" h="0.5rem" rounded="full" bg={subtext0}></Box>
}
