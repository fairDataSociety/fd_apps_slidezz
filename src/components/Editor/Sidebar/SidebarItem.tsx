import { Tooltip, Center, Icon, useColorModeValue } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface SidebarItemProps {
  onClick?: () => void
  icon: IconType
  label: string
}

export default function SidebarItem({
  onClick,
  icon,
  label,
}: SidebarItemProps) {
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
        p={5}
        w="full"
        _hover={{
          bg: useColorModeValue('latte-surface2', 'frappe-surface2'),
        }}
      >
        <Icon pointerEvents="none" as={icon} />
      </Center>
    </Tooltip>
  )
}
