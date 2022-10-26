import {
  Box,
  HStack,
  IconProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface ImportFileCardProps {
  title: string
  description: string
  Icon: (props: IconProps) => JSX.Element
}

export default function ImportFileCard({
  title,
  description,
  Icon,
}: ImportFileCardProps) {
  return (
    <HStack
      justify="space-between"
      w="md"
      cursor="pointer"
      gap={2}
      border="solid"
      borderWidth={1}
      p={6}
      rounded="lg"
      borderColor={useColorModeValue('latte-overlay0', 'frappe-overlay0')}
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <Icon flex={1} />
      <Box flex={2}>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text variant="subtext">{description}</Text>
      </Box>
    </HStack>
  )
}
