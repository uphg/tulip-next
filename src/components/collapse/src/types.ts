export type CollapseItemName = string | number
export type CollapseActiveNames = CollapseItemName | CollapseItemName[]
export type TriggerCollapseItem = (name: CollapseItemName | undefined) => void