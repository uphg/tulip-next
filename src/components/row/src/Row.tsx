import { includes, isArray, toPx, alignTypes, justifyTypes, toFlexPrefix, type AlignTypes, type JustifyTypes } from '../../../utils'
import { computed, defineComponent, provide, readonly, type PropType } from 'vue'

export const rowProps = {
  gutter: [Number, Array] as PropType<number | [number, number]>,
  justify: {
    type: String as PropType<JustifyTypes>,
    default: 'start',
    validator(value: string) {
      return includes(justifyTypes, value)
    }
  },
  align: {
    type: String as PropType<AlignTypes>,
    default: 'start',
    validator(value: string) {
      return includes(alignTypes, value)
    }
  },
  nowrap: Boolean as PropType<boolean>
}

const Row = defineComponent({
  name: 'TuRow',
  props: rowProps,
  setup(props, context) {

    const justifyContent = computed(() => toFlexPrefix(props.justify))
    const alignItems = computed(() => toFlexPrefix(props.align))
    const flexFlow = computed(() => `row ${props.nowrap ? 'nowrap' : 'wrap'}`)
    const gutter = computed(() => ({
      row: ((
        props.gutter && (isArray(props.gutter) ? props.gutter?.[0] : props.gutter)
      ) || 0) / 2,
      column: ((
        props.gutter && (isArray(props.gutter) ? props.gutter?.[1] : props.gutter)
      ) || 0) / 2
    }))

    provide('tu.row.gutter', readonly(gutter))
    
    return () => (
      <div class="tu-row" style={{
        justifyContent: justifyContent.value,
        alignItems: alignItems.value,
        flexFlow: flexFlow.value,
        marginTop: toPx(-1 * gutter?.value.row),
        marginLeft: toPx(-1 * gutter?.value.column),
        marginRight: toPx(-1 * gutter?.value.column),
        marginBottom: toPx(-1 * gutter?.value.row)
      }}>{context.slots.default?.()}</div>
    )
  }
})

export default Row