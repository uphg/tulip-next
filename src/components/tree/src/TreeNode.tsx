import { computed, defineComponent, inject, ref, shallowRef, watch, type Ref } from 'vue'
import { treeNodeProps } from './props'
import { useNameScope } from '../../../composables/useNameScope'
import CollapseTransition from '../../collapse-transition/src/CollapseTransition'
import { TuBaseIcon } from '../../base-icon'
import { ArrowDropRight } from '../../../icons'
import TuTreeNodeCheckbox from './TreeNodeCheckbox'
import type { TreeNodeMetaKey, TreeNodeMeta } from './types'
import type { TreeRef } from './Tree'
import type { CheckboxValue } from '../../checkbox/src/props'

const TreeNode = defineComponent({
  name: 'TuTreeItem',
  props: treeNodeProps,
  setup(props, context) {
    const ns = useNameScope('tree-node')
    const tree = inject<TreeRef>('tu.tree')
    const checked = computed(() => tree?.checkedKeys.value?.includes(props.item?.meta?.key as TreeNodeMetaKey))
    const indeterminate = computed(() => tree?.indeterminatekeys.value?.includes(props.item?.meta?.key as TreeNodeMetaKey))
    const expanded = computed(() => tree?.expandedKeys.value?.includes(props.item?.meta?.key as TreeNodeMetaKey))

    function onClickTreeNode(e: Event) {
      tree?.setSelectedKey(props.item?.meta?.key as TreeNodeMetaKey)
      tree?.onExpandedChange(props.item?.meta?.key as TreeNodeMetaKey)
    }

    function onUpdateChecked(value: CheckboxValue) {
      tree?.onCheckedChange(props.item?.meta?.key as TreeNodeMetaKey, props.levels)
    }

    return () => {
      const level = props.levels!.length - 1
      return (
        <div class={ns.suffix('wrap')}>
          <div
            class={[ns.base, {
              [ns.is('selected')]: tree?.selectedKey.value === props.item?.meta?.key
            }]}
            style={{ paddingLeft: level ? `${level * 16}px` : void 0 }}
            onClick={onClickTreeNode}
          >
            <div class={[ns.el('switch'), {
              [ns.el('switch--expanded')]: expanded.value,
              [ns.el('switch--hide')]: !props.item?.children
            }]}>
              <TuBaseIcon is={ArrowDropRight}/>
            </div>
            {props.checkable ? (
              <TuTreeNodeCheckbox checked={checked.value} indeterminate={indeterminate.value} onUpdateChecked={onUpdateChecked}/>
            ) : null}
            <div class={ns.el('label')}>
              <div class={ns.el('label-text')}>{props.item?.meta?.label}</div>
            </div>
          </div>
          {props.item?.children ? (
            <CollapseTransition>
              {expanded.value ? (
                <div class={ns.suffix('children')}>
                  {(props.item.children as TreeNodeMeta[])?.map((item, index) => (
                    <TreeNode
                      item={item}
                      parent={props.item}
                      key={item?.key as TreeNodeMetaKey}
                      levels={[...props.levels!, index]}
                      checkable={props.checkable} />
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