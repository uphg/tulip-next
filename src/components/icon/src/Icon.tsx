import { defineComponent, h, type Component, type PropType } from "vue";

const iconProps = {
  is: Object as PropType<Component>
}

const Icon = defineComponent({
  name: 'TuIcon',
  props: iconProps,
  setup(props, context) {
    return () => h('i', { class: 'tu-icon' }, props.is ? h(props.is) : context.slots.default?.())
  }
})

export default Icon
