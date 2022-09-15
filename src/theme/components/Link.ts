import { ComponentStyleConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const Link: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    fontWeight: 'semibold',
    color: mode('latte-rosewater', 'frappe-rosewater')(props),
    _hover: {
      color: mode('latte-flamingo', 'frappe-flamingo')(props),
    },
  }),
}

export default Link
