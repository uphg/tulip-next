import { computed, defineComponent, h } from 'vue'
import { spaceProps } from './spaceProps'
import { toPx, toFlexPrefix } from '../../../utils'

type SizeTypes = 'small' | 'medium' | 'large' 

const sizeMap = {
  small: [4, 8],
  medium: [8, 12],
  large: [12, 16]
}

const Space = defineComponent({
  name: 'TuSpace',
  props: spaceProps,
  setup(props, context) {
    const display = computed(() => `${props.inline ? 'inline-' : ''}flex`)
    const justifyContent = computed(() => toFlexPrefix(props.justify))
    const alignItems = computed(() => toFlexPrefix(props.align))
    const nowrap = computed(
      () => typeof props.nowrap === 'boolean'
        ? props.nowrap
        : props.vertical ? true : false
    )
    const flexFlow = computed(() => `${props.vertical ? 'column' : 'row'} ${nowrap.value ? 'nowrap' : 'wrap'}`)
    const gap = computed(
      () => {
        const defaults = sizeMap?.[props.size as SizeTypes]
        return (defaults
          ? toGapAttr(defaults)
          : Array.isArray(props.size)
            ? toGapAttr(props.size)
            : toPx(props.size))
      }
    )

    return () => (
      <div class="tu-space" style={{
        display: display.value,
        flexFlow: flexFlow.value,
        justifyContent: justifyContent.value,
        alignItems: alignItems.value,
        gap: gap.value
      }}>
        {props.wrapItem
          ? context.slots.default?.().map(
              (item) => h('div', { class: ['tu-space-item', props.itemClass], style: props.itemStyle }, [item])
            )
          : context.slots.default?.()}
      </div>
    )
  }
})

function toGapAttr(value: number[]) {
  if (value?.length < 2) return
  return `${toPx(value[0])} ${toPx(value[1])}`
}

export default Space