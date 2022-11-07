import { mode } from '@chakra-ui/theme-tools'

import colors from './colors'

export const globalStyles = {
  colors,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('latte-base', 'frappe-base')(props),
        color: mode('latte-text', 'frappe-text')(props),
      },
      h2: {
        color: mode('latte-subtext0', 'frappe-subtext0')(props),
      },
    }),
  },
}
