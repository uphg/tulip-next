import Input from './src/Input.vue'
import InputGroup from './src/InputGroup.vue'
import InputGroupLabel from './src/InputGroupLabel.vue'
import { withInstall } from '../../utils'

const TuInput = withInstall(Input)
const TuInputGroup = withInstall(InputGroup)
const TuInputGroupLabel = withInstall(InputGroupLabel)

export { TuInput, TuInputGroup, TuInputGroupLabel }
