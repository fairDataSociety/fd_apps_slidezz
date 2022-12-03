import { IconType } from 'react-icons'

import { Center, Icon, Tooltip } from '@chakra-ui/react'

import useColors from '../../../hooks/useColors'

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
  const { overlay1, surface2 } = useColors()

  return (
    <Tooltip bg={overlay1} label={label} placement="right" hasArrow>
      <Center
        onClick={onClick}
        cursor="pointer"
        p={{ base: 2, md: 5 }}
        w="full"
        _hover={{
          bg: surface2,
        }}
      >
        <Icon as={icon} pointerEvents="none" />
      </Center>
    </Tooltip>
  )
}
