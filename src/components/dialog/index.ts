import Dialog from './src/Dialog'
import { useDialog } from './src/use-dialog'
import { withInstall } from '../../utils'

const TDialog = withInstall(Dialog)

export { TDialog, useDialog }