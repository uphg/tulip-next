import { defineComponent } from 'vue'
import { radioProps } from './props'
import { useRadio } from './useRadio'
import { useNameScope } from '../../../composables/useNameScope'

const Radio = defineComponent({
  name: 'TuRadio',
  inheritAttrs: false,
  props: radioProps,
  emits: ['update:value'],
  setup(props, context) {
    const ns = useNameScope('radio')
    const { isFocus, checked, size, handleChange, handleFocus, handleBlur } = useRadio(props)

    return () => {
      const { value, label: _label, disabled } = props
      const { slots } = context
      const label = slots.default ? slots.default() : _label

      return (
        <label
          class={[ns.base, {
            [ns.is(size.value)]: size.value,
            [ns.is('checked')]: checked.value,
            [ns.is('focus')]: isFocus.value,
            [ns.is('disabled')]: disabled,
          }]}
        >
          <input
            class={[ns.suffix('input')]}
            type="radio"
            value={value}
            checked={checked.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={disabled}
            {...context.attrs}
          />
          <div class={ns.el('dot-wrap')}>
            <div class={[ns.el('dot'), { [ns.el('dot--checked')]: checked.value }]}></div>
          </div>
          {label ? <div class={ns.el('label')}>{label}</div> : null}
        </label>
      )

    }
  }
})

export default Radio
