import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'

export default function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="theme toggle button"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  )
}
