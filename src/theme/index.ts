import { extendTheme, withDefaultProps } from '@chakra-ui/react'
import { globalStyles } from './styles'
import Input from './components/Input'
import Link from './components/Link'
import Select from './components/Select'
import Text from './components/Text'
import Tooltip from './components/Tooltip'

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
