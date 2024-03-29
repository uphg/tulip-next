import type { ExtractPropTypes, PropType } from 'vue'
import type { TreeData, TreeNode, TreeNodeMeta, TreeNodeMetaKey } from './types'

export type TreeProps = ExtractPropTypes<typeof treeProps>
export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>

export const treeProps = {
  data: Array as PropType<TreeData>,
  cascade: Boolean as PropType<boolean>,
  checkable: Boolean as PropType<boolean>,
  checkedKeys: Array as PropType<TreeNodeMetaKey[]>,
  expandedKeys: Array as PropType<TreeNodeMetaKey[]>,
  indeterminateKeys: Array as PropType<TreeNodeMetaKey[]>,
  defaultCheckedKeys: Array as PropType<TreeNodeMetaKey[]>,
  defaultExpandedKeys: Array as PropType<TreeNodeMetaKey[]>,
  labelField: {
    type: String as PropType<string>,
    default: 'label'
  },
  keyField: {
    type: String as PropType<string>,
    default: 'key'
  },
  childrenField: {
    type: String as PropType<string>,
    default: 'children'
  },
  disabledField: {
    type: String as PropType<string>,
    default: 'disabled'
  }
}

export const treeNodeProps = {
  item: Object as PropType<TreeNode>,
  levels: {
    type: Array as PropType<number[]>,
    default: () => []
  },
  labelField: {
    type: String as PropType<string>,
    default: 'label'
  },
  keyField: {
    type: String as PropType<string>,
    default: 'key'
  },
  childrenField: {
    type: String as PropType<string>,
    default: 'children'
  },
  disabledField: {
    type: String as PropType<string>,
    default: 'disabled'
  }
}

export const treeNodeCheckboxProps = {
  checked: Boolean as PropType<boolean>,
  indeterminate: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
  onUpdateChecked: Function as PropType<(value: boolean) => void>
}