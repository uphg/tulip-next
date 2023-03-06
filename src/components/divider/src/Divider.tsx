import { computed, defineComponent, shallowRef, type PropType } from 'vue'
import { useNameScope } from '../../../composables/useNameScope'
import { toPx } from '../../../utils'

const Divider = defineComponent({
  name: 'TuDivider',
  props: {
    title: [String, Number] as PropType<string | number>,
    titlePlacement: {
      type: [String] as PropType<'left' | 'center' | 'right'>,
      default: 'center'
    },
    vertical: Boolean as PropType<boolean>,
    dashed: Boolean as PropType<boolean>,
    color: String as PropType<string>,
  },
  setup(props, context) {
    const ns = useNameScope('divider')
    const title = shallowRef<HTMLElement | null>(null)
    const titlePlacement = computed(() => (props.title ?? context.slots.default) ? props.titlePlacement : void 0)

    function getLineStyle(currentPlacement: 'left' | 'center' | 'right') {
      const placement = titlePlacement.value
      return placement && {
        width: placement === 'center'
          ? title.value?.offsetWidth && `calc(50% - ${toPx(title.value?.offsetWidth / 2)})`
          : placement === currentPlacement
            ? title.value?.offsetWidth && `calc(100% - ${toPx(title.value?.offsetWidth + 28)})`
            : `28px`
      }
    }

    return () => {
      const titleSlot = props.title ?? context.slots.default?.() 

      return (
        <div
          class={[ns.base, {
            [ns.is('vertical')]: props.vertical,
            [ns.is('dashed')]: props.dashed,
            [ns.is(`title-position-${titlePlacement.value}`)]: !!titlePlacement.value
          }]}
          style={{
            '--tu-color': props.color
          }}
        >{titleSlot ? ([
          <div class="tu-divider__line" style={getLineStyle('left')}></div>,
          <div ref={title} class="tu-divider__title">{titleSlot}</div>,
          <div class="tu-divider__line" style={getLineStyle('right')}></div>
        ]) : null}</div>
      )
    }
  }
})

export default Divider
