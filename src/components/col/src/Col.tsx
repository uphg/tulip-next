import { defineComponent, inject, readonly, type PropType, type Ref } from "vue";
import { toPx } from "../../../utils";

export const colProps = {
  span: {
    type: Number as PropType<number>,
    default: 1
  }
}

const Col = defineComponent({
  name: 'TuCol',
  props: colProps,
  setup(props, context) {
    const gutter = inject<Readonly<Ref<{ row: number | string, column: number | string }>>>('gutter')
    return () => (
      <div
        class={['tu-col', { [`tu-col-${props.span}`]: props.span }]}
        style={{
          paddingTop: toPx(gutter?.value.row),
          paddingLeft: toPx(gutter?.value.column),
          paddingRight: toPx(gutter?.value.column),
          paddingBottom: toPx(gutter?.value.row)
        }}
      >{context.slots.default?.()}</div>
    )
  }
})

export default Col