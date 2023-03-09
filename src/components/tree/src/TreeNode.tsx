import { defineComponent, ref } from 'vue'
import { treeNodeProps } from './props'
import { useNameScope } from '../../../composables/useNameScope'
import CollapseTransition from '../../collapse-transition/src/CollapseTransition'
import { TuBaseIcon } from '../../base-icon'
import { ArrowDropRight } from '../../../icons'

const TreeNode = defineComponent({
  name: 'TuTreeItem',
  props: treeNodeProps,
  setup(props, context) {
    const ns = useNameScope('tree-node')
    const expanded = ref(false)

    function onClickSwitch() {
      expanded.value = !expanded.value
    }
    return () => (
      <div class={ns.suffix('wrap')}>
        <div
          class={ns.base}
          style={{ paddingLeft: props.level ? `${props.level * 16}px` : void 0 }}
          onClick={onClickSwitch}
        >
          <div class={[ns.el('switch'), {
            [ns.el('switch--expanded')]: expanded.value,
            [ns.el('switch--hide')]: !props.item?.children
          }]}>
            <TuBaseIcon is={ArrowDropRight}/>
          </div>
          <div class={ns.el('label')}>
            <div class={ns.el('label-text')}>{props.item?.label}</div>
          </div>
        </div>
        {props.item?.children ? (
          <CollapseTransition>
            {expanded.value ? (
              <div class={ns.suffix('children')}>
                {props.item.children.map((item) => (
                  <TreeNode item={item} key={item.key} level={props.level! + 1} />
                ))}
              </div>
            ) : null}
          </CollapseTransition>
        ) : null}
      </div>
    )
    
  }
})

export default TreeNode