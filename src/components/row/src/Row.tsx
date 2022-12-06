import { isArray, toPx } from "../../../utils";
import { computed, defineComponent, provide, readonly, type PropType } from "vue";

export const rowProps = {
  gutter: [Number, Array] as PropType<number | [number, number]>,
}

const Row = defineComponent({
  name: 'TuRow',
  props: rowProps,
  setup(props, context) {
    const gutter = computed(() => ({
      row: ((
        props.gutter && (isArray(props.gutter) ? props.gutter?.[0] : props.gutter)
      ) || 0) / 2,
      column: ((
        props.gutter && (isArray(props.gutter) ? props.gutter?.[1] : props.gutter)
      ) || 0) / 2
    }))

    provide('gutter', readonly(gutter))
    
    return () => (
      <div class="tu-row" style={{
        marginTop: toPx(-1 * gutter?.value.row),
        marginLeft: toPx(-1 * gutter?.value.column),
        marginRight: toPx(-1 * gutter?.value.column),
        marginBottom: toPx(-1 * gutter?.value.row)
      }}>{context.slots.default?.()}</div>
    )
  }
})

export default Row