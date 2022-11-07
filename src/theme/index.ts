import { extendTheme, withDefaultProps } from '@chakra-ui/react'

import Input from './components/Input'
import Link from './components/Link'
import Select from './components/Select'
import Text from './components/Text'
import Tooltip from './components/Tooltip'
import { globalStyles } from './styles'

const theme = extendTheme(
  {
    ...globalStyles,
    components: {
      Input,
      Link,
      Select,
      Text,
      Tooltip,
    },
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: 'surface1',
      size: 'lg',
    },
    components: ['Button', 'Checkbox', 'Radio'],
  })
)

export default theme
