import Dialog from './src/Dialog'
import { useDialog } from './src/use-dialog'
import { withInstall } from '../../utils'

const TuDialog = withInstall(Dialog)

export { TuDialog, useDialog }