import { defineComponent, provide, ref, toRef, watch, type Ref } from 'vue'
import { treeProps, type TreeNodeProps, type TreeProps } from './props'
import TuTreeNode from './TreeNode'
import type { TreeNodeMetaKey, TreeNode, TreeNodeMeta } from './types'
import { isNil, remove } from '../../../utils'
import { generateTreeNodes } from './generateTreeNodes'

export type TreeRef = {
  treeNodes: Ref<TreeNode[]>
  selectedKey: Ref<TreeNodeMetaKey>,
  checkedKeys: Ref<TreeProps['checkedKeys']>
  expandedKeys: Ref<TreeProps['expandedKeys']>
  cascade: Ref<TreeProps['cascade']>
  getTreeNode: (levels: number[]) => TreeNode | undefined
  setSelectedKey: (value: TreeNodeMetaKey) => void
  onExpandedChange: (value: TreeNodeMetaKey) => void
  onCheckedChange: (value: TreeNodeMetaKey, levels: TreeNodeProps['levels']) => void
}

const Tree = defineComponent({
  name: 'TuTree',
  props: treeProps,
  emits: ['update:checkedKeys', 'update:expandedKeys'],
  setup(props, context) {
    const treeNodes = ref(generateTreeNodes(props.data))
    const selectedKey = ref<TreeNodeMetaKey>()
    const rawCheckedKeys = ref(props.checkedKeys ? [...props.checkedKeys] : [])
    const rawExpandedKeys = ref(props.expandedKeys ? [...props.expandedKeys] : [])

    watch(toRef(props, 'checkedKeys'), (newValue) => {
      rawCheckedKeys.value = newValue!
    })

    watch(toRef(props, 'expandedKeys'), (newValue) => {
      rawExpandedKeys.value = newValue!
    })

    provide('tu.tree', {
      selectedKey,
      checkedKeys: rawCheckedKeys,
      expandedKeys: rawExpandedKeys,
      cascade: toRef(props, 'cascade'),
      getTreeNode,
      setSelectedKey,
      onCheckedChange,
      onExpandedChange
    })

    function onCheckedChange(value: TreeNodeMetaKey, levels: TreeNodeProps['levels']) {
      if (props.cascade) {
        // 级联选择
        const currentNode = getTreeNode(levels)!
        if (rawCheckedKeys.value?.includes(value)) {
          let uncheckedKeys = getDeepTreeNodeKeys(currentNode)
          const siblingCheckedKeys = currentNode.parent?.children?.filter(
            (item) => rawCheckedKeys.value.includes(item.meta?.[props.keyField] as TreeNodeMetaKey)
          )

          if (siblingCheckedKeys?.length! >= currentNode.parent?.children?.length!) {
            uncheckedKeys = uncheckedKeys.concat(getUpperLayerAssociatedKeys(currentNode))
          }

          setCheckedKeys(rawCheckedKeys.value.filter((item) => !uncheckedKeys.includes(item)))
        } else {
          const newCheckedKeys = getDeepTreeNodeKeys(currentNode)
          const upperCheckedKeys = getUpperLayerNeedToCheckedKeys(currentNode)
          const otherCheckedKeys = newCheckedKeys.concat(upperCheckedKeys).filter((key) => !rawCheckedKeys.value.includes(key))

          setCheckedKeys(rawCheckedKeys.value.concat(otherCheckedKeys))
        }
      } else {
        setCheckedKeys(rawCheckedKeys.value?.includes(value)
          ? remove(rawCheckedKeys.value, (item) => item === value)
          : [...rawCheckedKeys.value, value]
        )
      }
    }

    function setCheckedKeys(keys: TreeNodeMetaKey[]) {
      if (typeof props.checkedKeys === 'undefined') {
        rawCheckedKeys.value = keys
      }

      context.emit('update:checkedKeys', keys)
    }

    function setSelectedKey(value: TreeNodeMetaKey) {
      selectedKey.value = value
    }

    function onExpandedChange(value: TreeNodeMetaKey) {
      setExpandedKeys(rawExpandedKeys.value?.includes(value)
        ? remove(rawExpandedKeys.value, (item) => item === value)
        : [...rawExpandedKeys.value, value]
      )
    }

    function setExpandedKeys(keys: TreeNodeMetaKey[]) {
      if (typeof props.expandedKeys === 'undefined') {
        rawExpandedKeys.value = keys
      }

      context.emit('update:expandedKeys', keys)
    }

    // 获取当前节点下所有关联的 key（包括当前节点、后代节点）
    function getDeepTreeNodeKeys(treeNode: TreeNode) {
      if(!treeNode) return []
      const result = [treeNode.meta?.[props.keyField]] as TreeNodeMetaKey[]
      const stack: [TreeNode[]] = [treeNode.children ?? []]

      while (stack.length) {
        const children = stack.shift()
        children?.forEach((item) => {
          result.push(item.meta?.key as TreeNodeMetaKey)
          if (item.children) {
            stack.push(item.children as TreeNode[])
          }
        })
      }

      return result
    }

    // 获取与当前节点关联的所有父级节点 key
    function getUpperLayerAssociatedKeys(treeNode: TreeNode) {
      if(!treeNode.parent) return []

      const result: TreeNodeMetaKey[] = []
      let parent: TreeNode | null = treeNode.parent

      while (parent) {
        result.push(parent?.meta?.key as TreeNodeMetaKey)
        parent = parent.parent ?? null
      }
      return result
    }

    // 获取所有需要取消选中的 key
    // function getUncheckedKeys(currentNode: TreeNode) {
    //   let uncheckedKeys = getDeepTreeNodeKeys(currentNode)
    //   const siblingCheckedKeys = currentNode.parent?.children?.filter(
    //     item => rawCheckedKeys.value.includes(item.meta?.[props.keyField] as TreeNodeMetaKey)
    //   )
    //   if (siblingCheckedKeys?.length! >= currentNode.parent?.children?.length!) {
    //     uncheckedKeys = uncheckedKeys.concat(getUpperLayerAssociatedKeys(currentNode))
    //   }
    // }

    // 获取上层所有需要勾选的 checkbox key
    function getUpperLayerNeedToCheckedKeys(treeNode: TreeNode) {
      const result = []
      let parent: TreeNode | undefined = treeNode.parent
      while (parent) {
        const siblingCheckedKeys = parent?.children?.filter(item => rawCheckedKeys.value.includes(item.meta?.[props.keyField] as TreeNodeMetaKey))
        if (siblingCheckedKeys?.length! >= (parent?.children?.length! - 1)) {
          result.push(parent.meta?.[props.keyField] as TreeNodeMetaKey)
          parent = parent.parent
        } else {
          parent = void 0
        }
      }

      return result
    }

    function getTreeNode(rawLevels: number[]) {
      if (!treeNodes.value?.length || !rawLevels.length) return
      const levels = [...rawLevels]
      let current: TreeNode | undefined = treeNodes.value[levels.shift()!]
      while (levels.length) {
        const item = levels.shift()!
        current = current?.children?.[item]
      }
      return current
    }

    return () => (
      <div>
        {treeNodes.value?.map((item, index) => (
          <TuTreeNode
            key={item.meta?.key as TreeNodeMetaKey}
            item={item}
            checkable={props.checkable}
            levels={[index]}/>
        ))}
      </div>
    )
  }
})

function pull<T extends unknown>(array: T[], index: number) {
  array.splice(index, 1)
}

function pullBy<T extends unknown>(array: T[], callback: (item: T) => boolean) {
  const index = array.findIndex(callback)
  pull(array, index)
}

export default Tree
