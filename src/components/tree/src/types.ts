export type TreeData = TreeNodeMeta[]

export type TreeNode = {
  meta?: TreeNodeMeta
  parent?: TreeNode
  children?: TreeNode[]
}

export type TreeNodeMeta = {
  [k: string]: TreeNodeMetaLabel | TreeNodeMetaKey | TreeNodeMeta[]
}

export type TreeNodeMetaLabel = string | number
export type TreeNodeMetaKey = string | number | symbol
