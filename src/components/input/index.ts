import Input from './src/Input'
import InputGroup from './src/InputGroup'
import InputGroupLabel from './src/InputGroupLabel'
import { withInstall } from '../../utils'

const TuInput = withInstall(Input)
const TuInputGroup = withInstall(InputGroup)
const TuInputGroupLabel = withInstall(InputGroupLabel)

export { TuInput, TuInputGroup, TuInputGroupLabel }
