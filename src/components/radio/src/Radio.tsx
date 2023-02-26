import { useNameScope } from '../../../composables/useNameScope'
import { computed, defineComponent, inject, ref, watch, type PropType } from 'vue'
import { radioGroupInjectionKey, type RadioGroupRef } from './RadioGroup'
import { radioProps } from './radioProps'
import { useRadio } from './useRadio'

const Radio = defineComponent({
  name: 'TuRadio',
  inheritAttrs: false,
  props: radioProps,
  emits: ['update:value'],
  setup(props, context) {
    const ns = useNameScope('radio')
    const { isFocus, checked, handleChange, handleFocus, handleBlur } = useRadio(props)

    return () => (
      <label
        class={[ns.base, {
          [ns.is('checked')]: checked.value,
          [ns.is('focus')]: isFocus.value,
          [ns.is('disabled')]: props.disabled
        }]}
      >
        <input
          class={[ns.suffix('input')]}
          type="radio"
          value={props.value}
          checked={checked.value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={props.disabled}
          {...context.attrs}
        />
        <div class={ns.el('dot-wrap')}>
          <div class={[ns.el('dot'), { [ns.el('dot--checked')]: checked.value }]}></div>
        </div>
        <div class={ns.el('label')}>{context.slots.default?.()}</div>
      </label>
    )
  }
})

export default Radio
