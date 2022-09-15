import { ComponentStyleConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const Text: ComponentStyleConfig = {
  variants: {
    subtext: (props: any) => ({
      color: mode('latte-subtext1', 'frappe-subtext1')(props),
    }),
  },
}

export default Text
