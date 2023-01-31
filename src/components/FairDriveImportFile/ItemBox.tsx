import { useColors } from 'catppuccin-chakra-ui-theme'
import { IconType } from 'react-icons'

import { Box, HStack, Icon, Text } from '@chakra-ui/react'

interface ItemBoxProps {
  text: string
  icon: IconType
  onClick: () => void
}

export default function ItemBox({ text, icon, onClick }: ItemBoxProps) {
  const { surface2, overlay1 } = useColors()

  return (
    <Box
      bg={surface2}
      _hover={{
        bg: overlay1,
      }}
      p={5}
      rounded="xl"
      cursor="pointer"
      onClick={onClick}
    >
      <HStack>
        <Icon as={icon} /> <Text>{text}</Text>
      </HStack>
    </Box>
  )
}
