import { defineComponent, type PropType } from "vue";

const buttonGroupProps = {
  vertical: Boolean as PropType<boolean>
}

const ButtonGroup = defineComponent({
  name: 'TuButtonGroup',
  props: buttonGroupProps,
  setup(props, context) {
    return () => (
      <div class={['tu-button-group', { 'tu-button--vertical': props.vertical }]}>
        {context.slots.default?.()}
      </div>
    )
  }
})

export default ButtonGroup
