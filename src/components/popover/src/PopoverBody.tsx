import { defineComponent, Teleport, Transition, type PropType, ref, computed, type Ref } from 'vue';

const PopoverBody = defineComponent({
  name: 'TuPopoverBody',
  inheritAttrs: false,
  props: {
    visible: Boolean as PropType<boolean>,
    position: Object as PropType<Record<string, any>>
  },
  emits: ['update:visible'],
  setup(props, context) {
    const popoverRef = ref<HTMLElement | null>(null)
    const halfWidth = computed(() => (popoverRef.value?.offsetWidth || 0) / 2)
    const style = computed(() => ({
      top: `${props.position?.top - (popoverRef.value?.offsetHeight || 0) - 8}px`,
      left: `${props.position?.left - halfWidth.value}px`
    }))

    context.expose({
      popoverBody: popoverRef
    })
    return () => (
      <Teleport to="body">
        <Transition
          name="popover-fade"
        >
          {{
            default: () => props.visible ? (
              <div class="tu-popover" ref={popoverRef} style={style.value}>
                <div class="tu-popover__content">{context.slots.default?.()}</div>
                <div class="tu-popover-arrow-wrapper" style={{ left: `${halfWidth.value}px` }}>
                  <div class="tu-popover-arrow"></div> 
                </div>
              </div>
            ) : null
          }}
        </Transition>
      </Teleport>
    )
  }
})

export default PopoverBody
