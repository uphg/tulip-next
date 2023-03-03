import { makeInstaller } from '../utils'
import { TuButton } from './button'
import { TuButtonGroup } from './button-group'
import { TuInput } from './input'
import { TuInputGroup } from './input-group'
import { TuInputGroupLabel } from './input-group-label'
import { TuSwitch } from './switch'
import { TuDialog, useDialog } from './dialog'
import { TuCollapseTransition } from './collapse-transition'
import { TuTabs } from './tabs'
import { TuTabPane } from './tab-pane'
import { TuExpandTransition } from './expand-transition'
import { TuPagination } from './pagination'
import { TuPopover } from './popover'
import { TuTooltip } from './tooltip'
import { TuSpace } from './space'
import { TuRow } from './row'
import { TuCol } from './col'
import { TuEllipsis } from './ellipsis'
import { TuCollapse } from './collapse'
import { TuCollapseItem } from './collapse-item'
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
import { TuCard } from './card'
import { TuCheckbox } from './checkbox'
import { TuCheckboxGroup } from './checkbox-group'
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
  TuRadioButton,
  TuCard,
  TuCheckbox,
  TuCheckboxGroup
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
  TuCard,
  TuCheckbox,
  TuCheckboxGroup,

  // utils
  useDialog,
  useDraggable,
  install
}
