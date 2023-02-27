import { isNil } from '../../../utils'
import { computed, defineComponent, ref, type StyleValue, type PropType, shallowRef } from 'vue'
import { TuTooltip } from '../../tooltip'
import { useNameScope } from '../../../composables/useNameScope'

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
    const ns = useNameScope('ellipsis')
    const container = shallowRef<HTMLElement | null>(null)
    const text = shallowRef<HTMLElement | null>(null)

    const visible = ref(false)
    const lineClamp = computed(() => isNil(props.lineClamp) ? 1 : Number(props.lineClamp))
    const tooltipDisabled = computed(() => (
      !props.tooltip || (lineClamp.value === 1
        ? container.value?.offsetWidth! >= text.value?.offsetWidth!
        : container.value?.offsetHeight! >= text.value?.offsetHeight!)
    ))
    const className = computed(() => [ns.base, {
      [ns.is('line-clamp')]: lineClamp.value > 1,
      [ns.is('cursor-pointer')]: props.expandTrigger === 'click'
    }])
    const style = computed(() => isNil(props.expandTrigger) || (props.expandTrigger === 'click' && visible.value)
      ? lineClamp.value <= 1
        ? { 'text-overflow': 'ellipsis' }
        : lineClamp.value > 1
          ? { '-webkit-line-clamp': `${lineClamp.value}` as string } as StyleValue
          : void 0
      : void 0)

    const events = props.expandTrigger === 'click' ? { onClick: () => visible.value = !visible.value } : {}

    return () => (
      <TuTooltip trigger="hover" placement="top" disabled={tooltipDisabled.value}>
        {{
          default: context.slots.tooltip || context.slots.default,
          trigger: () => (
            <span
              ref={container}
              class={className.value}
              style={style.value}
              {...events} {...context.attrs}>
              <span class={ns.suffix('text')} ref={text}>{context.slots.default?.()}</span>
            </span>
          )
        }}
      </TuTooltip>
    )
  }
})

export default Ellipsis