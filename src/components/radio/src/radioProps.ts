import type { ExtractPropTypes, PropType } from 'vue'

export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioProps = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean | null>,
    default: null
  },
  checked: {
    type: Boolean as PropType<boolean>,
    default: void 0
  },
  label: String as PropType<string>,
  disabled: Boolean as PropType<boolean>
}