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
  indeterminatekeys: Ref<TreeProps['indeterminatekeys']>
  cascade: Ref<TreeProps['cascade']>
  setSelectedKey: (value: TreeNodeMetaKey) => void
  onExpandedChange: (value: TreeNodeMetaKey) => void
  onCheckedChange: (value: TreeNodeMetaKey, levels: TreeNodeProps['levels']) => void
  getLevelsToTreeNode: (levels: number[]) => TreeNode | undefined
}

const Tree = defineComponent({
  name: 'TuTree',
  props: treeProps,
  emits: ['update:checkedKeys', 'update:expandedKeys', 'update:indeterminatekeys'],
  setup(props, context) {
    const treeNodes = ref(generateTreeNodes(props.data))
    const selectedKey = ref<TreeNodeMetaKey>()
    const rawCheckedKeys = ref(props.checkedKeys ? [...props.checkedKeys] : [])
    const rawExpandedKeys = ref(props.expandedKeys ? [...props.expandedKeys] : [])
    const rawIndeterminatekeys = ref(props.indeterminatekeys ? [...props.indeterminatekeys] : [])

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
      indeterminatekeys: rawIndeterminatekeys,
      cascade: toRef(props, 'cascade'),
      getLevelsToTreeNode,
      setSelectedKey,
      onCheckedChange,
      onExpandedChange
    })

    function onCheckedChange(value: TreeNodeMetaKey, levels: TreeNodeProps['levels']) {
      if (props.cascade) {
        // 级联选择
        const currentNode = getLevelsToTreeNode(levels)!
        rawCheckedKeys.value?.includes(value) ? updateUncheckedState(currentNode) : updateCheckedState(currentNode)
      } else {
        setCheckedKeys(rawCheckedKeys.value?.includes(value)
          ? remove(rawCheckedKeys.value, (item) => item === value)
          : [...rawCheckedKeys.value, value]
        )
      }
    }

    function updateUncheckedState(currentNode: TreeNode) {
      let uncheckedKeys = getDeepTreeNodeKeys(currentNode)
      const parentCheckedKeys = currentNode.parent?.children?.filter(
        (item) => rawCheckedKeys.value.includes(item.meta?.[props.keyField] as TreeNodeMetaKey)
      )

      if (parentCheckedKeys?.length! >= currentNode.parent?.children?.length!) {
        uncheckedKeys = uncheckedKeys.concat(getUpperLayerAssociatedKeys(currentNode))
      }

      const nextCheckedKeys = rawCheckedKeys.value.filter((item) => !uncheckedKeys.includes(item))
      setCheckedKeys(nextCheckedKeys)
      updateUncheckedIndeterminateKeys(currentNode, nextCheckedKeys)
    }

    function updateCheckedState(currentNode: TreeNode) {
      const newCheckedKeys = getDeepTreeNodeKeys(currentNode)
      const upperCheckedKeys = getUpperLayerNeedToCheckedKeys(currentNode)
      const otherCheckedKeys = newCheckedKeys.concat(upperCheckedKeys).filter((key) => !rawCheckedKeys.value.includes(key))
      const nextCheckedKeys = rawCheckedKeys.value.concat(otherCheckedKeys)

      setCheckedKeys(nextCheckedKeys)
      updateCheckedIndeterminateKeys(currentNode, nextCheckedKeys)
    }

    function updateUncheckedIndeterminateKeys(currentNode: TreeNode, nextCheckedKeys: TreeNodeMetaKey[]) {
      let nextIndeterminatekeys = [...rawIndeterminatekeys.value]
      let parent: TreeNode | undefined | null = currentNode.parent

      while (parent) {
        const parentKey = parent?.meta?.key as TreeNodeMetaKey
        const checkeds = getCheckedNodes(parent?.children, nextCheckedKeys)
        const indeterminates = getCheckedNodes(parent?.children, nextIndeterminatekeys)

        if (!checkeds?.length && !indeterminates?.length) {
          if (nextIndeterminatekeys.includes(parentKey)) {
            nextIndeterminatekeys = nextIndeterminatekeys.filter((item) => item !== parentKey)
          }
        } else {
          if (!nextIndeterminatekeys.includes(parentKey)) {
            nextIndeterminatekeys.push(parentKey)
          }
        }
        parent = parent.parent ? parent.parent : null
      }

      setIndeterminatekeys(nextIndeterminatekeys)
    }

    function updateCheckedIndeterminateKeys(currentNode: TreeNode, nextCheckedKeys: TreeNodeMetaKey[]) {
      let indeterminatekeys = [...rawIndeterminatekeys.value]
      const currentKey = currentNode?.meta?.key as TreeNodeMetaKey
      if (indeterminatekeys.includes(currentKey)) {
        const checkedKeys = getDeepTreeNodeKeys(currentNode)
        indeterminatekeys = indeterminatekeys.filter((item) => !checkedKeys.includes(item))
      }

      indeterminatekeys = getCheckedIndeterminateKeys(currentNode, nextCheckedKeys, indeterminatekeys)

      setIndeterminatekeys(indeterminatekeys)
    }

    function getCheckedIndeterminateKeys(currentNode: TreeNode, nextCheckedKeys: TreeNodeMetaKey[], indeterminatekeys: TreeNodeMetaKey[]) {
      let parent: TreeNode | undefined | null = currentNode.parent

      while (parent) {
        const parentKey = parent?.meta?.key as TreeNodeMetaKey
        const checkedNodes = getCheckedNodes(parent?.children, nextCheckedKeys)
        const indeterminateNodes = getCheckedNodes(parent?.children, indeterminatekeys)
        const childrenLength = parent.children?.length!
        const checkedsLength = checkedNodes.length

        if (checkedsLength > 0 && checkedsLength < childrenLength || indeterminateNodes?.length) {
          if (!indeterminatekeys.includes(parentKey)) {
            indeterminatekeys.push(parentKey)
          }
          parent = parent.parent
        } else if (checkedsLength >= childrenLength) {
          indeterminatekeys = indeterminatekeys.filter((item) => item !== parentKey)
          parent = parent.parent
        } else {
          parent = null
        }
      }

      return indeterminatekeys
    }

    function setIndeterminatekeys(keys: TreeNodeMetaKey[]) {
      if (isNil(props.indeterminatekeys)) {
        rawIndeterminatekeys.value = keys
      }
      context.emit('update:indeterminatekeys', keys)
    }

    function getCheckedNodes(treeNodes: TreeNode[] | undefined, checkedKeys: TreeNodeMetaKey[]) {
      return treeNodes?.filter(item => checkedKeys.includes(item?.meta?.key as TreeNodeMetaKey))!
    }

    function getIndeterminateKeys(treeNodes: TreeNode[], { keyField } = { keyField: 'key' }) {
      const result: TreeNodeMetaKey[] = [...rawIndeterminatekeys.value]
      const stack = [treeNodes]
      while (stack.length) {
        const currentNodes = stack.shift()

        currentNodes?.forEach((currentNode) => {
          if (!currentNode?.children?.length) return
          const childrenCheckedkeys = getCheckedNodes(currentNode?.children, rawCheckedKeys.value)
          const childrenIndeterminatekeys = getCheckedNodes(currentNode?.children, result)

          if (childrenIndeterminatekeys.length || childrenCheckedkeys.length > 0 && childrenCheckedkeys.length < currentNode?.children?.length) {
            result.push(currentNode?.meta?.[keyField] as TreeNodeMetaKey)

            // 查看父级是否半选
            let parent: TreeNode | null | undefined = currentNode.parent
            while (parent) {
              const parentKey = parent?.meta?.[keyField] as TreeNodeMetaKey
              if (result.includes(parentKey)) {
                parent = null
              } else {
                result.push(parentKey)
                parent = parent.parent
              }
            }
            
          }

          if (currentNode.children) {
            stack.push(currentNode.children)
          }
        })
      }

      return result
    }

    function setCheckedKeys(keys: TreeNodeMetaKey[]) {
      if (isNil(props.checkedKeys)) {
        rawCheckedKeys.value = keys
      }
      context.emit('update:checkedKeys', keys)
    }

    function onExpandedChange(value: TreeNodeMetaKey) {
      setExpandedKeys(rawExpandedKeys.value?.includes(value)
        ? remove(rawExpandedKeys.value, (item) => item === value)
        : [...rawExpandedKeys.value, value]
      )
    }

    function setExpandedKeys(keys: TreeNodeMetaKey[]) {
      if (isNil(props.expandedKeys)) {
        rawExpandedKeys.value = keys
      }
      context.emit('update:expandedKeys', keys)
    }

    function setSelectedKey(value: TreeNodeMetaKey) {
      selectedKey.value = value
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

    // 根据 levels 获取指定节点
    function getLevelsToTreeNode(rawLevels: number[]) {
      if (!treeNodes.value?.length || !rawLevels.length) return
      const levels = [...rawLevels]
      let current: TreeNode | undefined = treeNodes.value[levels.shift()!]
      while (levels.length) {
        const item = levels.shift()!
        current = current?.children?.[item]
      }
      return current
    }

    rawIndeterminatekeys.value = getIndeterminateKeys(treeNodes.value)

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
