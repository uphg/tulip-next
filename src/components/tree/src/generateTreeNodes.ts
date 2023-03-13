import type { TreeNode, TreeData, TreeNodeMeta } from './types'

export function generateTreeNodes(data?: TreeData, { childrenField } = { childrenField: 'children' }) {
  if (!data) return []
  const current = data
  const result: TreeNode[] = []
  const cache: [TreeNodeMeta, TreeNode][] = []
  const stack: [TreeData, TreeNode | null, TreeNode[]][] = [[current, null, result]]

  while (stack.length) {
    const [source, parent, copy] = stack.shift()!
    source.forEach(item => {
      const prev = findCache(cache, item)
      const node = prev ? prev : {
        meta: item,
        parent
      } as TreeNode

      copy.push(node)
      cache.push([item, node])

      if (item[childrenField]) {
        node.children = []
        stack.push([item[childrenField] as TreeNodeMeta[], node, node.children])
      }
    })
  }

  return result
}

function findCache(cache: [TreeNodeMeta, TreeNode][], value: TreeNodeMeta) {
  return cache.find((item) => item[0] === value)?.[1]
}
