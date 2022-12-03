import { useColorMode } from '@chakra-ui/react'

export default function useColors() {
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'

  const crust = isLight ? 'latte-crust' : 'frappe-crust'
  const subtext0 = isLight ? 'latte-subtext0' : 'frappe-subtext0'
  const overlay0 = isLight ? 'latte-overlay0' : 'frappe-overlay0'
  const overlay1 = isLight ? 'latte-overlay1' : 'frappe-overlay1'
  const surface2 = isLight ? 'latte-surface2' : 'frappe-surface2'
  const rosewater = isLight ? 'latte-rosewater' : 'frappe-rosewater'

  return { crust, subtext0, overlay0, overlay1, surface2, rosewater }
}
