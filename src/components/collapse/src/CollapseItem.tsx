import { computed, defineComponent, inject, type Ref } from 'vue'
import { collapseInjectionKey, type CollapseContent } from './Collapse'
import { TuIcon } from '../../icon'
import { TuCollapseTransition } from '../../collapse-transition'
import { isNil } from '../../../utils'
import { ArrowRightRoundSmall } from '../../../icons'
import { useNameScope } from '../../../composables/useNameScope'

const collapseItemProps = {
  title: [String, Number],
  name: [String, Number],
}

const CollapseItem = defineComponent({
  name: 'TuCollapseItem',
  props: collapseItemProps,
  setup(props, context) {
    const ns = useNameScope('collapse-item')
    const collapse = inject<Ref<CollapseContent>>(collapseInjectionKey)
    const isActive = computed(() => {
      if (isNil(props.name)) return false

      return collapse?.value.props.accordion
        ? props.name === collapse.value.activeNames
        : (collapse?.value.activeNames as (string | number)[]).includes(props.name)
    })

    return () => (
      <div class={ns.base}>
        <div class={ns.el('header')} onClick={() => collapse?.value.triggerCollapseItem(props.name)}>
          <span class={[ns.suffix('arrow'), { active: isActive.value }]}>
            <TuIcon><ArrowRightRoundSmall/></TuIcon>
          </span>
          {props.title}
        </div>
        <TuCollapseTransition>
          {isActive.value ? (
            <div class={ns.el('content-wrap')}>
              <div class={ns.el('content')}>{context.slots.default?.()}</div>
            </div>
          ) : null}
        </TuCollapseTransition>
      </div>
    )
  }
})

export default CollapseItem
