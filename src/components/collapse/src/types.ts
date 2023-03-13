import type { Ref } from 'vue'
import type { CollapseProps } from './Collapse'

export type CollapseItemName = string | number
export type CollapseActiveNames = CollapseItemName | CollapseItemName[]
export type TriggerCollapseItem = (name: CollapseItemName | undefined) => void

export type CollapseContent = {
  activeNames: Ref<CollapseActiveNames>,
  triggerCollapseItem: TriggerCollapseItem,
  props: CollapseProps
}
