import { defineComponent, provide, ref, toRef, watch, type Ref } from 'vue'
import { treeProps, type TreeNodeProps, type TreeProps } from './props'
import TuTreeNode from './TreeNode'
import type { TreeNodeMetaKey, TreeNode, TreeNodeMeta } from './types'
import { remove } from '../../../utils'
import { generateTreeNodes } from './generateTreeNodes'

export type TreeRef = {
  treeNodes: Ref<TreeNode[]>
  selectedKey: Ref<TreeNodeMetaKey>,
  checkedKeys: Ref<TreeProps['checkedKeys']>
  expandedKeys: Ref<TreeProps['expandedKeys']>
  cascade: Ref<TreeProps['cascade']>
  getTreeNode: (levels: number[]) => TreeNode | undefined
  setSelectedKey: (value: TreeNodeMetaKey) => void
  setExpandedKeys: (value: TreeNodeMetaKey) => void
  onUpdateChecked: (value: TreeNodeMetaKey, levels: TreeNodeProps['levels']) => void
}

const Tree = defineComponent({
  name: 'TuTree',
  props: treeProps,
  emits: ['update:checkedKeys', 'update:expandedKeys'],
  setup(props, context) {
    const treeNodes = ref(generateTreeNodes(props.data))
    const selectedKey = ref<TreeNodeMetaKey>()
    const _checkedKeys = ref(props.checkedKeys ? [...props.checkedKeys] : [])
    const _expandedKeys = ref(props.expandedKeys ? [...props.expandedKeys] : [])

    watch(_checkedKeys, (newValue) => {
      context.emit('update:checkedKeys', newValue)
    })

    watch(_expandedKeys, (newValue) => {
      context.emit('update:expandedKeys', newValue)
    })

    provide('tu.tree', {
      selectedKey,
      checkedKeys: _checkedKeys,
      expandedKeys: _expandedKeys,
      cascade: toRef(props, 'cascade'),
      getTreeNode,
      setSelectedKey,
      setExpandedKeys,
      onUpdateChecked
    })

    function onUpdateChecked(value: TreeNodeMetaKey, levels: TreeNodeProps['levels']) {
      if (props.cascade) {
        // 级联选择的逻辑
        const currentNode = getTreeNode(levels)!
        if (_checkedKeys.value?.includes(value)) {
          let uncheckedKeys = getDeepTreeNodeKeys(currentNode)
          const siblingCheckedKeys = currentNode.parent?.children?.filter(item => _checkedKeys.value.includes(item.meta?.[props.keyField] as TreeNodeMetaKey))
          if (siblingCheckedKeys?.length! >= currentNode.parent?.children?.length!) {
            uncheckedKeys = uncheckedKeys.concat(getUpperLayerAllKeys(currentNode))
          }
          _checkedKeys.value = _checkedKeys.value.filter((item) => !uncheckedKeys.includes(item))
        } else {
          const currentCheckedKeys = getDeepTreeNodeKeys(currentNode)
          let parent: TreeNode | undefined = currentNode.parent
          while (parent) {
            const siblingCheckedKeys = parent?.children?.filter(item => _checkedKeys.value.includes(item.meta?.[props.keyField] as TreeNodeMetaKey))
            if (siblingCheckedKeys?.length! >= (parent?.children?.length! - 1)) {
              currentCheckedKeys.push(parent.meta?.[props.keyField] as TreeNodeMetaKey)
              parent = parent.parent
            } else {
              parent = void 0
            }
          }

          currentCheckedKeys.forEach((key) => {
            if (!_checkedKeys.value.includes(key)) {
              _checkedKeys.value.push(key)
            }
          })
        }
      } else {
        if (_checkedKeys.value?.includes(value)) {
          _checkedKeys.value = remove(_checkedKeys.value, (item) => item === value)
        } else {
          _checkedKeys.value = _checkedKeys.value ? [..._checkedKeys.value, value] : [value]
        }
      }
    }

    function setSelectedKey(value: TreeNodeMetaKey) {
      selectedKey.value = value
    }

    function setExpandedKeys(value: TreeNodeMetaKey) {
      if (_expandedKeys.value?.includes(value)) {
        _expandedKeys.value = remove(_expandedKeys.value, (item) => item === value)
      } else {
        _expandedKeys.value = _expandedKeys.value ? [..._expandedKeys.value, value] : [value]
      }
    }

    // 获取当前节点下所有 key（包括后代节点）
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

    function getUpperLayerAllKeys(treeNode: TreeNode) {
      if(!treeNode.parent) return []

      const result: TreeNodeMetaKey[] = []
      let parent: TreeNode | null = treeNode.parent

      while (parent) {
        result.push(parent?.meta?.key as TreeNodeMetaKey)
        parent = parent.parent ?? null
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
