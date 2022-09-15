import { HStack, Text, Spinner, useColorModeValue } from '@chakra-ui/react'

interface LoadingToastProps {
  label: string
}

export default function LoadingToast({ label }: LoadingToastProps) {
  return (
    <HStack
      fontSize="xl"
      bg={useColorModeValue('latte-surface2', 'frappe-surface2')}
      p={3}
    >
      <Spinner size="sm" />
      <Text>{label}</Text>
    </HStack>
  )
}
