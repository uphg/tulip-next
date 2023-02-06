import { isNil } from '../../../utils'
import { computed, defineComponent, ref, type StyleValue, type PropType } from 'vue'
import { TuTooltip } from '../../tooltip'

const ellipsisProps = {
  lineClamp: {
    type: [String, Number],
    default: void 0
  },
  expandTrigger: {
    type: String as PropType<'click'>,
    default: void 0
  },
  tooltip: {
    type: Boolean as PropType<boolean>,
    default: true
  }
}

const Ellipsis = defineComponent({
  name: 'TuEllipsis',
  props: ellipsisProps,
  inheritAttrs: false,
  setup(props, context) {
    const visible = ref(false)
    const containerRef = ref<HTMLElement | null>(null)
    const textRef = ref<HTMLElement | null>(null)
    const lineClamp = computed(() => isNil(props.lineClamp) ? 1 : Number(props.lineClamp))
    const tooltipDisabled = computed(() => (
      !props.tooltip || (lineClamp.value === 1
        ? containerRef.value?.offsetWidth! >= textRef.value?.offsetWidth!
        : containerRef.value?.offsetHeight! >= textRef.value?.offsetHeight!)
    ))
    const className = computed(() => ['tu-ellipsis', {
      'tu-ellipsis--line-clamp': lineClamp.value > 1,
      'tu-ellipsis--cursor-pointer': props.expandTrigger === 'click'
    }])
    const style = computed(() => isNil(props.expandTrigger) || (props.expandTrigger === 'click' && visible.value)
      ? lineClamp.value <= 1
        ? { 'text-overflow': 'ellipsis' }
        : lineClamp.value > 1
          ? { '-webkit-line-clamp': `${lineClamp.value}` as string } as StyleValue
          : void 0
      : void 0)

    const on = props.expandTrigger === 'click' ? { onClick: () => visible.value = !visible.value } : {}

    return () => (
      <TuTooltip trigger="hover" placement="top" disabled={tooltipDisabled.value}>
        {{
          default: context.slots.tooltip || context.slots.default,
          trigger: () => (
            <span
              ref={containerRef}
              class={className.value}
              style={style.value}
              {...on} {...context.attrs}>
              <span class="tu-ellipsis-text" ref={textRef}>{context.slots.default?.()}</span>
            </span>
          )
        }}
      </TuTooltip>
    )
  }
})

export default Ellipsis