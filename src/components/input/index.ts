import Input from './src/Input.vue'
import InputGroup from './src/InputGroup.vue'
import InputGroupLabel from './src/InputGroupLabel.vue'
import { withInstall } from '../../utils'

const TInput = withInstall(Input)
const TInputGroup = withInstall(InputGroup)
const TInputGroupLabel = withInstall(InputGroupLabel)

export { TInput, TInputGroup, TInputGroupLabel }
