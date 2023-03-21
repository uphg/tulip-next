import { defineComponent, provide, ref, toRef, watch, type Ref } from 'vue'
import { treeProps, type TreeNodeProps, type TreeProps } from './props'
import TuTreeNode from './TreeNode'
import type { TreeNodeMetaKey, TreeNode, TreeNodeMeta } from './types'
import { isNil, remove } from '../../../utils'
import { generateTreeNodes } from './generateTreeNodes'
import { useCachedValue } from '../../../composables/useCachedValue'

export type TreeRef = {
  treeNodes: Ref<TreeNode[]>
  selectedKey: Ref<TreeNodeMetaKey>,
  checkedKeys: Ref<TreeProps['checkedKeys']>
  expandedKeys: Ref<TreeProps['expandedKeys']>
  indeterminateKeys: Ref<TreeProps['indeterminateKeys']>
  checkable: Ref<TreeProps['checkable']>
  cascade: Ref<TreeProps['cascade']>
  setSelectedKey: (value: TreeNodeMetaKey) => void
  onExpandedChange: (value: TreeNodeMetaKey) => void
  onCheckedChange: (value: TreeNodeMetaKey, levels: TreeNodeProps['levels']) => void
  getLevelsToTreeNode: (levels: number[]) => TreeNode | undefined
}

const Tree = defineComponent({
  name: 'TuTree',
  props: treeProps,
  emits: ['update:checkedKeys', 'update:expandedKeys', 'update:indeterminateKeys'],
  setup(props, context) {
    const treeNodes = ref(generateTreeNodes(props.data))
    const selectedKey = ref<TreeNodeMetaKey>()
    const checkedKeys = useCachedValue(props, 'checkedKeys', { context, defaultValue: props.checkedKeys ? [...props.checkedKeys] : props.defaultCheckedKeys ? [...props. defaultCheckedKeys] : [] }) as Ref<TreeNodeMetaKey[]>
    const expandedKeys = useCachedValue(props, 'expandedKeys', { context, defaultValue: props.expandedKeys ? [...props.expandedKeys] : props.defaultExpandedKeys ? [...props. defaultExpandedKeys] : [] }) as Ref<TreeNodeMetaKey[]>
    const indeterminateKeys = useCachedValue(props, 'indeterminateKeys', { context, defaultValue: props.indeterminateKeys ? [...props.indeterminateKeys] : [] }) as Ref<TreeNodeMetaKey[]>

    provide('tu.tree', {
      selectedKey,
      checkedKeys: checkedKeys,
      expandedKeys: expandedKeys,
      indeterminateKeys: indeterminateKeys,
      checkable: toRef(props, 'checkable'),
      cascade: toRef(props, 'cascade'),
      getLevelsToTreeNode,
      setSelectedKey,
      onCheckedChange,
      onExpandedChange
    })

    function onCheckedChange(value: TreeNodeMetaKey | undefined, levels: TreeNodeProps['levels']) {
      if (isNil(value)) return
      console.log('props.cascade')
      console.log(props.cascade)
      if (props.cascade) {
        // 级联选择
        const currentNode = getLevelsToTreeNode(levels)!
        checkedKeys.value?.includes(value) ? updateUncheckedState(currentNode) : updateCheckedState(currentNode)
      } else {
        checkedKeys.value = checkedKeys.value?.includes(value)
          ? remove(checkedKeys.value, (item) => item === value)
          : [...checkedKeys.value!, value]
      }
    }

    function updateUncheckedState(currentNode: TreeNode) {
      let uncheckedKeys = getDeepTreeNodeKeys(currentNode)
      const parentCheckedKeys = currentNode.parent?.children?.filter(
        (item) => checkedKeys.value?.includes(item.meta?.[props.keyField] as TreeNodeMetaKey)
      )

      if (parentCheckedKeys?.length! >= currentNode.parent?.children?.length!) {
        uncheckedKeys = uncheckedKeys.concat(getUpperLayerAssociatedKeys(currentNode))
      }

      const nextCheckedKeys = checkedKeys.value?.filter((item) => !uncheckedKeys.includes(item))
      checkedKeys.value = nextCheckedKeys
      updateUncheckedIndeterminateKeys(currentNode, nextCheckedKeys)
    }

    function updateCheckedState(currentNode: TreeNode) {
      const newCheckedKeys = getDeepTreeNodeKeys(currentNode)
      const upperCheckedKeys = getUpperLayerNeedToCheckedKeys(currentNode)
      const otherCheckedKeys = newCheckedKeys.concat(upperCheckedKeys).filter((key) => !checkedKeys.value?.includes(key))
      const nextCheckedKeys = checkedKeys.value?.concat(otherCheckedKeys)
      checkedKeys.value = nextCheckedKeys
      updateCheckedIndeterminateKeys(currentNode, nextCheckedKeys)
    }

    function updateUncheckedIndeterminateKeys(currentNode: TreeNode, nextCheckedKeys: TreeNodeMetaKey[]) {
      let nextIndeterminatekeys = [...indeterminateKeys.value!]
      let parent: TreeNode | undefined | null = currentNode.parent

      while (parent) {
        const parentKey = parent?.meta?.[props.keyField] as TreeNodeMetaKey
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

      indeterminateKeys.value = nextIndeterminatekeys
    }

    function updateCheckedIndeterminateKeys(currentNode: TreeNode, nextCheckedKeys: TreeNodeMetaKey[]) {
      let prevKeys = [...indeterminateKeys.value]
      const currentKey = currentNode?.meta?.[props.keyField] as TreeNodeMetaKey
      if (prevKeys.includes(currentKey)) {
        const checkedKeys = getDeepTreeNodeKeys(currentNode)
        prevKeys = prevKeys.filter((item) => !checkedKeys.includes(item))
      }

      indeterminateKeys.value = getCheckedIndeterminateKeys(currentNode, nextCheckedKeys, prevKeys)
    }

    function getCheckedIndeterminateKeys(currentNode: TreeNode, nextCheckedKeys: TreeNodeMetaKey[], indeterminateKeys: TreeNodeMetaKey[]) {
      let parent: TreeNode | undefined | null = currentNode.parent

      while (parent) {
        const parentKey = parent?.meta?.[props.keyField] as TreeNodeMetaKey
        const checkedNodes = getCheckedNodes(parent?.children, nextCheckedKeys)
        const indeterminateNodes = getCheckedNodes(parent?.children, indeterminateKeys)
        const childrenLength = parent.children?.length!
        const checkedsLength = checkedNodes.length

        if (checkedsLength > 0 && checkedsLength < childrenLength || indeterminateNodes?.length) {
          if (!indeterminateKeys.includes(parentKey)) {
            indeterminateKeys.push(parentKey)
          }
          parent = parent.parent
        } else if (checkedsLength >= childrenLength) {
          indeterminateKeys = indeterminateKeys.filter((item) => item !== parentKey)
          parent = parent.parent
        } else {
          parent = null
        }
      }

      return indeterminateKeys
    }

    function getCheckedNodes(treeNodes: TreeNode[] | undefined, checkedKeys: TreeNodeMetaKey[]) {
      return treeNodes?.filter(item => checkedKeys.includes(item?.meta?.[props.keyField] as TreeNodeMetaKey))!
    }

    function getIndeterminateKeys(treeNodes: TreeNode[]) {
      const result: TreeNodeMetaKey[] = [...indeterminateKeys.value]
      const stack = [treeNodes]
      while (stack.length) {
        const currentNodes = stack.shift()

        currentNodes?.forEach((currentNode) => {
          if (!currentNode?.children?.length) return
          const childrenCheckedkeys = getCheckedNodes(currentNode?.children, checkedKeys.value)
          const childrenIndeterminatekeys = getCheckedNodes(currentNode?.children, result)

          if (childrenIndeterminatekeys.length || childrenCheckedkeys.length > 0 && childrenCheckedkeys.length < currentNode?.children?.length) {
            result.push(currentNode?.meta?.[props.keyField] as TreeNodeMetaKey)

            // 查看父级是否半选
            let parent: TreeNode | null | undefined = currentNode.parent
            while (parent) {
              const parentKey = parent?.meta?.[props.keyField] as TreeNodeMetaKey
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

    function onExpandedChange(value?: TreeNodeMetaKey) {
      if (isNil(value)) return

      expandedKeys.value = expandedKeys.value?.includes(value)
        ? remove(expandedKeys.value, (item) => item === value)
        : [...expandedKeys.value, value]
    }

    function setSelectedKey(value?: TreeNodeMetaKey) {
      if (isNil(value)) return
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
          result.push(item.meta?.[props.keyField] as TreeNodeMetaKey)
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
        result.push(parent?.meta?.[props.keyField]as TreeNodeMetaKey)
        parent = parent.parent ?? null
      }
      return result
    }

    // 获取上层所有需要勾选的 checkbox key
    function getUpperLayerNeedToCheckedKeys(treeNode: TreeNode) {
      const result = []
      let parent: TreeNode | undefined = treeNode.parent
      while (parent) {
        const siblingCheckedKeys = parent?.children?.filter(item => checkedKeys.value?.includes(item.meta?.[props.keyField] as TreeNodeMetaKey))
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

    indeterminateKeys.value = getIndeterminateKeys(treeNodes.value)

    return () => (
      <div class="tu-tree">
        {treeNodes.value?.map((item, index) => (
          <TuTreeNode
            key={item.meta?.[props.keyField] as TreeNodeMetaKey}
            item={item}
            levels={[index]}
          />
        ))}
      </div>
    )
  }
})



export default Tree
