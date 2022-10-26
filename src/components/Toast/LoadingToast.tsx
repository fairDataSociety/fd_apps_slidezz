import { HStack, Text, Spinner, useColorModeValue, Box } from '@chakra-ui/react'

interface LoadingToastProps {
  label: string
}

export default function LoadingToast({ label }: LoadingToastProps) {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      height="100vh"
      width="100vw"
      bg="blackAlpha.700"
      zIndex={1000}
    >
      <HStack
        rounded="xl"
        w="md"
        position="relative"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        fontSize="xl"
        bg={useColorModeValue('latte-surface2', 'frappe-surface2')}
        p={3}
      >
        <Spinner size="sm" />
        <Text>{label}</Text>
      </HStack>
    </Box>
  )
}
