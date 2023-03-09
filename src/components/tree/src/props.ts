import type { PropType } from 'vue'

type TreeData = TreeNodeItem[]

export type TreeNodeItem = {
  label: string,
  key: string | number | symbol
  children: TreeNodeItem[]
}

export const treeProps = {
  data: Array as PropType<TreeData>
}

export const treeNodeProps = {
  item: Object as PropType<TreeNodeItem>,
  level: Number as PropType<number>
}
