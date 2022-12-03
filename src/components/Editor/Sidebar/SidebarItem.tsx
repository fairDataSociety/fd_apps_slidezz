import { IconType } from 'react-icons'

import { Center, Icon, Tooltip } from '@chakra-ui/react'

import useColors from '../../../hooks/useColors'

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
  const { overlay1, surface2 } = useColors()
  return (
    <Tooltip bg={overlay1} label={label} placement="right" hasArrow>
      <Center
        onClick={onClick}
        cursor="pointer"
        p={5}
        w="full"
        _hover={{
          bg: surface2,
        }}
      >
        <Icon pointerEvents="none" as={icon} />
      </Center>
    </Tooltip>
  )
}
