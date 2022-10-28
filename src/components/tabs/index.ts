import Tabs from './src/Tabs'
import TabPane from './src/TabPane'
import { withInstall } from '../../utils'

const TTabs = withInstall(Tabs)
const TTabPane = withInstall(TabPane)

export { TTabs, TTabPane }
