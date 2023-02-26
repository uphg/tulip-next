import { makeInstaller } from '../utils'
import { TuButton, TuButtonGroup } from './button'
import { TuInput, TuInputGroup, TuInputGroupLabel } from './input'
import { TuSwitch } from './switch'
import { TuDialog, useDialog } from './dialog'
import { TuCollapseTransition } from './collapse-transition'
import { TuTabPane, TuTabs } from './tabs'
import { TuExpandTransition } from './expand-transition'
import { TuPagination } from './pagination'
import { TuPopover } from './popover'
import { TuTooltip } from './tooltip'
import { TuSpace } from './space'
import { TuRow } from './row'
import { TuCol } from './col'
import { TuEllipsis } from './ellipsis'
import { TuCollapse, TuCollapseItem } from './collapse'
import { TuScrollbar } from './scrollbar'
import { TuImage } from './image'
import { TuImageGroup } from './image'
import { TuDraggable } from './draggable'
import { TuPopup } from './popup'
import { TuCascader } from './cascader'
import { TuSelectionInput } from './selection-input'
import { TuSelect } from './select'
import { TuModal } from './modal'
import { TuRadio } from './radio'
import { TuRadioGroup } from './radio-group'
import { TuRadioButton } from './radio-button'
import { useDraggable } from '../composables/useDraggable'

const components = [
  TuButton,
  TuButtonGroup,
  TuInput,
  TuInputGroup,
  TuInputGroupLabel,
  TuCollapseTransition,
  TuExpandTransition,
  TuSwitch,
  TuTabs,
  TuTabPane,
  TuDialog,
  TuPagination,
  TuPopover,
  TuTooltip,
  TuSpace,
  TuRow,
  TuCol,
  TuEllipsis,
  TuCollapse,
  TuCollapseItem,
  TuScrollbar,
  TuImage,
  TuImageGroup,
  TuDraggable,
  TuPopup,
  TuCascader,
  TuSelectionInput,
  TuSelect,
  TuModal,
  TuRadio,
  TuRadioGroup,
  TuRadioButton
]

const { install } = makeInstaller(components)

export {
  TuButton,
  TuButtonGroup,
  TuInput,
  TuInputGroup,
  TuInputGroupLabel,
  TuCollapseTransition,
  TuExpandTransition,
  TuSwitch,
  TuTabs,
  TuTabPane,
  TuPagination,
  TuPopover,
  TuTooltip,
  TuSpace,
  TuRow,
  TuCol,
  TuEllipsis,
  TuCollapse,
  TuCollapseItem,
  TuScrollbar,
  TuImage,
  TuImageGroup,
  TuDraggable,
  TuPopup,
  TuCascader,
  TuSelectionInput,
  TuSelect,
  TuModal,
  TuRadio,
  TuRadioGroup,
  TuRadioButton,

  // utils
  useDialog,
  useDraggable,
  install
}
