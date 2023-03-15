import { defineComponent, type Component, computed } from 'vue'
import { useNameScope } from '../../../composables/useNameScope'
import { CheckCircle, CloseCircle, WarningCircle, InfoCircle, CloseSmall } from '../../../icons'
import TuButton from '../../button/src/Button'
import TuBaseIcon from '../../base-icon/src/BaseIcon'
import { dialogProps } from './props'

const statusMap: { [key: string]: Component } = {
  success: CheckCircle,
  warning: WarningCircle,
  info: InfoCircle,
  error: CloseCircle,
}

export default defineComponent({
  name: 'TuDialog',
  props: dialogProps,
  setup(props) {
    const ns = useNameScope('dialog')
    const statusIcon = computed(() => props.status ? statusMap?.[props.status] : null)

    return () => (
      <div class={[ns.base, { [ns.is(props.status)]: !!props.status }]}>
        <div class={ns.el('content')}>
          <div class={ns.el('header')}>
            <>
              {statusIcon.value ? (
                <TuBaseIcon class={ns.el('prefix-icon')} is={statusIcon.value}/>
              ) : null }
              <span class={ns.el('title')}>{props.title}</span>
              <button class={ns.el('close')} tabindex="0" onClick={props.onClose}>
                <TuBaseIcon is={CloseSmall}/>
              </button>
            </>
          </div>
          <div class={ns.el('body')}>
            {props.content}
          </div>
          {props.cancelText || props.confirmText ? (
            <div class={ns.el('footer')}>
              {props.cancelText ? (
                <TuButton size="small" onClick={props.onCancel}>{props.cancelText}</TuButton>
              ) : null}
              {props.confirmText ? (
                <TuButton size="small" hue={props.status} onClick={props.onConfirm}>{props.confirmText}</TuButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})
