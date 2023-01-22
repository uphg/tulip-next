import { defineComponent, h, type PropType, type Component } from 'vue'

const iconProps = {
  is: Object as PropType<Component>
}

const BaseIcon = defineComponent({
  name: 'TuBaseIcon',
  props: iconProps,
  setup(props, context) {
    return () => h('i', { class: 'tu-base-icon' }, props.is ? h(props.is) : context.slots.default?.())
  }
})

export default BaseIcon 