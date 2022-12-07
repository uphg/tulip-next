import { defineComponent, inject, type PropType, type Ref } from "vue";
import { toPx } from "../../../utils";

export const colProps = {
  span: {
    type: [String, Number] as PropType<string | number>,
    default: 1
  },
  offset: [String, Number] as PropType<string | number>,
  push: [String, Number] as PropType<string | number>,
  pull: [String, Number] as PropType<string | number>,
}

const Col = defineComponent({
  name: 'TuCol',
  props: colProps,
  setup(props, context) {
    const gutter = inject<Readonly<Ref<{ row: number | string, column: number | string }>>>('tu.row.gutter')
    return () => (
      <div
        class={['tu-col', {
          [`tu-col--span-${props.span}`]: props.span,
          [`tu-col--offset-${props.offset}`]: props.offset,
          [`tu-col--push-${props.push}`]: props.push,
          [`tu-col--pull-${props.pull}`]: props.pull,
        }]}
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