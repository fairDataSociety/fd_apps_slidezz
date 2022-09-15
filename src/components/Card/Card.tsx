import { HStack, useColorModeValue } from '@chakra-ui/react'

interface CardProps {
  children: React.ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <HStack
      align="center"
      justify="space-between"
      textAlign="center"
      bg={useColorModeValue('latte-crust', 'frappe-crust')}
      p={{ base: 3, md: 6 }}
      rounded="lg"
      fontSize="xl"
      cursor="pointer"
      _hover={{
        boxShadow: 'dark-lg',
      }}
      h="100px"
      w="300px"
    >
      {children}
    </HStack>
  )
}
