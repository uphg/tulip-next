import { computed, defineComponent, onMounted, ref, type SetupContext, nextTick } from "vue";
import { TuTooltip } from "../../tooltip";

const ellipsisProps = {
  lineClamp: {
    type: [String, Number],
    default: 1
  }
}

const Ellipsis = defineComponent({
  name: 'TuEllipsis',
  props: ellipsisProps,
  inheritAttrs: false,
  setup(props, context: SetupContext<"update:visible"[]>) {
    const containerRef = ref<HTMLElement | null>(null)
    const textRef = ref<HTMLElement | null>(null)
    const tooltipDisabled = computed(() => (
      Number(props.lineClamp) === 1
        ? containerRef.value?.offsetWidth! >= textRef.value?.offsetWidth!
        : containerRef.value?.offsetHeight! >= textRef.value?.offsetHeight!
    ))

    return () => (
      <TuTooltip trigger="hover" placement="top" disabled={tooltipDisabled.value}>
        {{
          content: context.slots.default,
          default: () => (
            <span
              class={['tu-ellipsis', { 'tu-ellipsis--line-clamp': Number(props.lineClamp) > 1 }]}
              ref={containerRef}
              style={Number(props.lineClamp) > 1 ? { '-webkit-line-clamp': `${props.lineClamp}` } : void 0}
              {...context.attrs}
            >
              <span class="tu-ellipsis-text" ref={textRef}>{context.slots.default?.()}</span>
            </span>
          )
        }}
      </TuTooltip>
    )
  }
})

export default Ellipsis