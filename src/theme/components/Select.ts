import { ComponentStyleConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const Select: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    field: {
      cursor: 'pointer',
      border: '1px',
      borderColor: mode('latte-overlay0', 'frappe-overlay0')(props),
      bg: 'transparent',
      _focus: {
        borderColor: mode('latte-lavender', 'frappe-lavender')(props),
      },
    },
  }),
}

export default Select
