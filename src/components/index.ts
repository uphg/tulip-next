import { TButton, TButtonGroup } from './button/index'
import { TInput, TInputGroup, TInputGroupLabel } from './input/index'
import { TCollapseTransition } from './collapse-transition/index'
import { makeInstaller } from '../utils'

const components = [
  TButton,
  TButtonGroup,
  TInput,
  TInputGroup,
  TInputGroupLabel,
  TCollapseTransition
]

const { install } = makeInstaller(components)


export {
  TButton,
  TButtonGroup,
  TInput,
  TInputGroup,
  TInputGroupLabel,
  TCollapseTransition,
  install
}