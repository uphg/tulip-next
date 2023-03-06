import type { ExtractPropTypes, PropType } from 'vue'

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioProps = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: void 0
  },
  checked: {
    type: Boolean as PropType<boolean>,
    default: void 0
  },
  label: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  size: String as PropType<'small' | 'medium' | 'large'>,
}

export const radioGroupProps = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: void 0
  },
  buttonStyle: {
    type: String as PropType<'outline' | 'solid'>,
    default: 'outline'
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
}
