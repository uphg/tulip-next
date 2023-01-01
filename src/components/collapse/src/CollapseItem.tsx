import { computed, defineComponent, inject, type Ref } from 'vue'
import { TuIcon } from '../../icon'
import { TuCollapseTransition } from '../../collapse-transition'
import ArrowRightRoundSmall from '../../../icons/ArrowRightRoundSmall.vue'
import type { ActiveName } from './Collapse'

const collapseItemProps = {
  title: [String, Number],
  name: [String, Number],
}

const CollapseItem = defineComponent({
  name: 'TuCollapseItem',
  props: collapseItemProps,
  setup(props, context) {
    const activeNames = inject<Ref<Readonly<ActiveName>>>('activeNames')
    const isActive = computed(() => props.name && (activeNames?.value as (string | number)[]).includes(props.name))
    const onClickCollapseItem = inject<(names: string | number | undefined) => void>('onClickCollapseItem')!
   
    return () => (
      <div class="tu-collapse-item">
        <div class="tu-collapse-item__header" onClick={() => onClickCollapseItem(props.name)}>
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
