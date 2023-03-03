import { TAGKEY } from '../../../shared'
import { computed, defineComponent, getCurrentInstance, toRef, toRefs, type PropType } from 'vue'
import { useNameScope } from '../../../composables/useNameScope'
import { radioProps } from './radioProps'
import { useRadio } from './useRadio'

const RadioButton = defineComponent({
  name: 'TuRadioButton',
  props: radioProps,
  emits: ['update:value'],
  [TAGKEY]: 'RadioButton',
  setup(props, context) {
    const ns = useNameScope('radio-button')
    const { isFocus, checked, size, radioGroup, handleChange, handleFocus, handleBlur } = useRadio(props)

    if (radioGroup) {
      radioGroup.setButton(radioGroup.buttons.value.length, {
        value: toRef(props, 'value'),
        disabled: toRef(props, 'disabled'),
        isFocus: isFocus
      })
    }

    return () => (
      <label class={[ns.base, {
        [ns.is(size.value)]: size.value,
        [ns.is('checked')]: checked.value,
        [ns.is('focus')]: isFocus.value,
        [ns.is('disabled')]: props.disabled,
        [ns.is('filling')]: radioGroup?.filling.value,
      }]}>
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
        <div class={ns.el('label')}>{context.slots.default?.()}</div>
        {radioGroup?.filling.value ? null : [
          <div class={ns.el('border')}></div>,
          <div class={ns.el('status-border')}></div>
        ]}
      </label>
    )
  }
})

export default RadioButton
