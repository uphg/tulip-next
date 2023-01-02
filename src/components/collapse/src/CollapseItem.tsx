import { computed, defineComponent, inject, type Ref } from 'vue'
import type { CollapseActiveNames } from './types'
import { collapseInjectionKey, type CollapseContent } from './Collapse'
import { TuIcon } from '../../icon'
import { TuCollapseTransition } from '../../collapse-transition'
import { isNil } from '../../../utils'
import ArrowRightRoundSmall from '../../../icons/ArrowRightRoundSmall.vue'

const collapseItemProps = {
  title: [String, Number],
  name: [String, Number],
}

const CollapseItem = defineComponent({
  name: 'TuCollapseItem',
  props: collapseItemProps,
  setup(props, context) {
    const collapse = inject<Ref<CollapseContent>>(collapseInjectionKey)
    const isActive = computed(() => {
      if (isNil(props.name)) return false

      return collapse?.value.props.accordion
        ? props.name === collapse.value.activeNames
        : (collapse?.value.activeNames as (string | number)[]).includes(props.name)
    })

    return () => (
      <div class="tu-collapse-item">
        <div class="tu-collapse-item__header" onClick={() => collapse?.value.triggerCollapseItem(props.name)}>
          <span class={['tu-collapse-item-arrow', { active: isActive.value }]}>
            <TuIcon><ArrowRightRoundSmall/></TuIcon>
          </span>
          {props.title}
        </div>
        <TuCollapseTransition>
          {isActive.value ? (
            <div class="tu-collapse-item__content-wrap">
              <div class="tu-collapse-item__content">{context.slots.default?.()}</div>
            </div>
          ) : null}
        </TuCollapseTransition>
      </div>
    )
  }
})

export default CollapseItem
