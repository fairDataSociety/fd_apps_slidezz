import { IconType } from 'react-icons'

import { Center, Icon, Tooltip, useColorModeValue } from '@chakra-ui/react'

interface SlideSidebarItemProps {
  onClick?: () => void
  icon: IconType
  label: string
}

export default function SlideSidebarItem({
  onClick,
  icon,
  label,
}: SlideSidebarItemProps) {
  return (
    <Tooltip
      bg={useColorModeValue('latte-overlay1', 'frappe-overlay1')}
      label={label}
      placement="right"
      hasArrow
    >
      <Center
        onClick={onClick}
        cursor="pointer"
        p={{ base: 2, md: 5 }}
        w="full"
        _hover={{
          bg: useColorModeValue('latte-surface2', 'frappe-surface2'),
        }}
      >
        <Icon as={icon} pointerEvents="none" />
      </Center>
    </Tooltip>
  )
}
