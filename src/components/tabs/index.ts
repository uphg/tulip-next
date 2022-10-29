import Tabs from './src/Tabs'
import TabPane from './src/TabPane'
import { withInstall } from '../../utils'

const TuTabs = withInstall(Tabs)
const TuTabPane = withInstall(TabPane)

export { TuTabs, TuTabPane }
