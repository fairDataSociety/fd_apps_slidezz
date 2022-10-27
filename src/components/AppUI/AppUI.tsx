import { Box, HStack, Image, useColorModeValue } from '@chakra-ui/react'

export default function AppUI() {
  return (
    <Box
      alignSelf="center"
      w={{ base: '100%', sm: '80%', md: '90%' }}
      bg={useColorModeValue('latte-crust', 'frappe-crust')}
      rounded="md"
      boxShadow="lg"
    >
      <HStack p={2}>
        <Circle />
        <Circle />
        <Circle />
      </HStack>

      <Box w="full" px={2} py={2}>
        <Image
          alt="app screenshot"
          w="98%"
          mx="auto"
          h="full"
          objectFit="contain"
          src={`${window._detectedSiteType.basePath}/images/app-screenshot.png`}
        />
      </Box>
    </Box>
  )
}

const Circle = () => {
  return (
    <Box
      w="0.5rem"
      h="0.5rem"
      rounded="full"
      bg={useColorModeValue('latte-subtext0', 'frappe-subtext0')}
    ></Box>
  )
}
