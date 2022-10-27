import ButtonGroup from './src/ButtonGroup.vue'
import Button from './src/Button.vue'
import { withInstall } from '../../utils'

const TButton = withInstall(Button)
const TButtonGroup = withInstall(ButtonGroup)

export { TButton, TButtonGroup }
