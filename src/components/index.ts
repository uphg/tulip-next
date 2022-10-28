import { TButton, TButtonGroup } from './button'
import { TInput, TInputGroup, TInputGroupLabel } from './input'
import { TCollapseTransition } from './collapse-transition'
import { TSwitch } from './switch'
import { TTabPane, TTabs } from './tabs'
import { makeInstaller } from '../utils'
import { TDialog } from './dialog'
import { TExpandTransition } from './expand-transition'

const components = [
  TButton,
  TButtonGroup,
  TInput,
  TInputGroup,
  TInputGroupLabel,
  TCollapseTransition,
  TExpandTransition,
  TSwitch,
  TTabs,
  TTabPane,
  TDialog,
]

const { install } = makeInstaller(components)

export {
  TButton,
  TButtonGroup,
  TInput,
  TInputGroup,
  TInputGroupLabel,
  TCollapseTransition,
  TExpandTransition,
  TSwitch,
  TTabs,
  TTabPane,
  install
}
