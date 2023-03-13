import { computed, defineComponent, inject, ref, shallowRef, Transition } from 'vue'
import { checkboxGroupInjectionKey, type CheckboxGroupRef } from './CheckboxGroup'
import { checkboxProps } from './props'
import { useNameScope } from '../../../composables/useNameScope'
import { Checked as CheckedIcon, Line as LineIcon } from '../../../icons'
import { isNil } from '../../../utils'

const Checkbox = defineComponent({
  name: 'TuCheckbox',
  props: checkboxProps,
  emits: ['update:checked'],
  setup(props, context) {
    const ns = useNameScope('checkbox')
    const checkbox = shallowRef<HTMLInputElement | null>(null)
    const isFocus = ref(false)
    const checkboxGroup = inject<CheckboxGroupRef | null>(checkboxGroupInjectionKey, null)
    const checked = computed(() => isNil(checkboxGroup) ? props.checked : checkboxGroup.value.value?.includes(props.value!))
    const size = computed(() => props.size ? props.size : checkboxGroup?.size.value)

    function handleClick(e: Event) {
      if (checkboxGroup) {
        checkboxGroup?.updateValue(props.value)
        return
      }

      context.emit('update:checked', !props.checked)
      props.onClick?.(e as MouseEvent, { value: props.value, checked: props.checked })
    }

    function handleFocus() {
      isFocus.value = true
    }

    function handleBlur() {
      isFocus.value = false
    }

    function focus() {
      checkbox.value?.focus()
    }

    function blur() {
      checkbox.value?.blur()
    }

    context.expose({ focus, blur })

    return () => {
      const { indeterminate, label: _label, disabled } = props
      const { slots } = context
      const label = slots.default ? slots.default() : _label
      return (
        <div
          class={[ns.base, {
            [ns.is(size.value)]: size.value,
            [ns.is('checked')]: checked.value,
            [ns.is('focus')]: isFocus.value,
            [ns.is('disabled')]: disabled,
            [ns.is('indeterminate')]: indeterminate
          }]}
          ref={checkbox}
          type="checkbox"
          value={props.value}
          checked={checked.value}
          disabled={disabled}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabindex="0"
        >
          <div class={ns.suffix('box-wrap')}>
            <div class={ns.suffix('box')}>
              <Transition name="tu-checkbox-zoom">
                {indeterminate ? (
                  <div class={ns.suffix('box__icon')} key="icon-1">
                    <LineIcon class="line-icon" />
                  </div>
                ) : checked.value ? (
                  <div class={ns.suffix('box__icon')} key="icon-2">
                    <CheckedIcon class="check-icon" />
                  </div>
                ) : null}
              </Transition>
            </div>
          </div>
          {label ? <div class={ns.el('label')}>{label}</div> : null}
        </div>
      )
    }
  }
})

export default Checkbox