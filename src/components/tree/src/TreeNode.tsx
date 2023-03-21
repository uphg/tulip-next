import { computed, defineComponent, inject, ref, shallowRef, watch, type Ref } from 'vue'
import { treeNodeProps } from './props'
import { useNameScope } from '../../../composables/useNameScope'
import CollapseTransition from '../../collapse-transition/src/CollapseTransition'
import { TuBaseIcon } from '../../base-icon'
import { ArrowDropRight } from '../../../icons'
import TuTreeNodeCheckbox from './TreeNodeCheckbox'
import type { TreeNodeMetaKey, TreeNodeMeta } from './types'
import type { TreeRef } from './Tree'
import { isNil } from '../../../utils'

const TreeNode = defineComponent({
  name: 'TuTreeItem',
  props: treeNodeProps,
  setup(props, context) {
    const ns = useNameScope('tree-node')
    const tree = inject<TreeRef>('tu.tree')
    const treeNode = computed(() => {
      const { meta } = props.item!
      return {
        key: meta?.[props.keyField] as TreeNodeMetaKey,
        label: meta?.[props.labelField] as string,
        disabled: meta?.[props.disabledField] as boolean
      }
    })
    const checked = computed(() => tree?.checkedKeys.value?.includes(treeNode.value.key))
    const indeterminate = computed(() => tree?.indeterminateKeys.value?.includes(treeNode.value.key))
    const expanded = computed(() => !isNil(treeNode.value.key) && tree?.expandedKeys.value?.length ? tree?.expandedKeys.value?.includes(treeNode.value.key) : false)

    function handleTreeNodeClick(e: Event) {
      if (treeNode.value.disabled) return
      tree?.setSelectedKey(treeNode.value.key)
      tree?.onExpandedChange(treeNode.value.key)
    }

    function handleSwitchClick(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
      tree?.onExpandedChange(treeNode.value.key)
    }

    function onUpdateChecked() {
      tree?.onCheckedChange(treeNode.value.key, props.levels)
    }

    function isSelect(value: TreeNodeMetaKey) {
      const selectedKey = tree?.selectedKey.value
      return isNil(selectedKey) || isNil(value) ? false : selectedKey === value
    }

    return () => {
      const level = props.levels!.length - 1
      return (
        <div class={ns.suffix('wrap')}>
          <div
            class={[ns.base, {
              [ns.is('selected')]: isSelect(treeNode.value.key),
              [ns.is('disabled')]: treeNode.value.disabled
            }]}
            style={{ paddingLeft: level ? `${level * 16}px` : void 0 }}
            onClick={handleTreeNodeClick}
          >
            <div
              class={[ns.el('switch'), {
                [ns.el('switch--expanded')]: expanded.value,
                [ns.el('switch--hide')]: !props.item?.children
              }]}
              onClick={handleSwitchClick}
            >
              <TuBaseIcon is={ArrowDropRight}/>
            </div>
            {tree?.checkable.value || tree?.cascade.value ? (
              <TuTreeNodeCheckbox
                checked={checked.value}
                indeterminate={indeterminate.value}
                disabled={treeNode.value.disabled}
                onUpdateChecked={onUpdateChecked}
              />
            ) : null}
            <div class={ns.el('label')}>
              <div class={ns.el('label-text')}>{treeNode.value.label}</div>
            </div>
          </div>
          {props.item?.children ? (
            <CollapseTransition>
              {expanded.value ? (
                <div class={ns.suffix('children')}>
                  {props.item.children.map((current, index) => (
                    <TreeNode
                      item={current}
                      parent={props.item}
                      key={current.meta?.[props.keyField] as TreeNodeMetaKey}
                      levels={[...props.levels!, index]}
                    />
                  ))}
                </div>
              ) : null}
            </CollapseTransition>
          ) : null}
        </div>
      )
    }
  }
})

export default TreeNode