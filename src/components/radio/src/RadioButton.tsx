import { defineComponent, ref, shallowRef, toRef } from 'vue'
import { TAGKEY } from '../../../shared'
import { useNameScope } from '../../../composables/useNameScope'
import { radioProps } from './props'
import { useRadio } from './useRadio'

const RadioButton = defineComponent({
  name: 'TuRadioButton',
  props: radioProps,
  emits: ['update:checked'],
  [TAGKEY]: 'RadioButton',
  setup(props, context) {
    const ns = useNameScope('radio-button')
    const input = shallowRef<HTMLInputElement | null>(null)
    const { isFocus, checked, size, radioGroup, handleChange, handleFocus, handleBlur, focus, blur } = useRadio(props, context, input)

    if (radioGroup) {
      const { setButton, buttons } = radioGroup
      setButton(buttons.value.length, {
        value: toRef(props, 'value'),
        disabled: toRef(props, 'disabled'),
        isFocus: isFocus
      })
    }

    context.expose({ focus, blur })

    return () => {
      const filling = radioGroup?.buttonStyle.value === 'solid'

      return (
        <label class={[ns.base, {
          [ns.is(size.value)]: size.value,
          [ns.is('checked')]: checked.value,
          [ns.is('focus')]: isFocus.value,
          [ns.is('disabled')]: props.disabled,
          [ns.is('filling')]: filling,
        }]}>
          <input
            ref={input}
            class={[ns.suffix('input')]}
            type="radio"
            value={props.value}
            checked={checked.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={props.disabled}
          />
          <div class={ns.el('label')}>{context.slots.default?.()}</div>
          {filling ? null : [
            <div class={ns.el('border')}></div>,
            <div class={ns.el('status-border')}></div>
          ]}
        </label>
      )
    }
  }
})

export default RadioButton
