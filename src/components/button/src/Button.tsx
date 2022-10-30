import { defineComponent, ref, Transition } from "vue";
import LoadingIcon from './LoadingIcon'
import { TuBaseWave } from '../../base-wave'
import { TuExpandTransition } from '../../expand-transition'
import { TuIcon } from '../../icon/index'
import type { PropType } from 'vue'
import type { BaseWaveRef } from '../../base-wave'

const buttonProps = {
  type: {
    type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'info' | 'error'>,
    default: 'default',
    validator: (value: string) => {
      return [ 'default', 'primary', 'success', 'warning', 'info', 'error' ].includes(value)
    }
  },
  size: {
    type: String as PropType<'' | 'large' | 'medium' | 'small'>,
    validator: (value: string) => {
      return ['', 'large', 'medium', 'small'].includes(value)
    }
  },
  icon: {
    type: String,
    default: ''
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
    validator: (value: string) => {
      return ['left', 'right'].includes(value)
    }
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
    validator: (value: string) => {
      return ['button', 'submit', 'reset'].includes(value)
    }
  },
  loading: Boolean,
  disabled: Boolean,
  text: Boolean,
  circle: Boolean,
  round: Boolean,
  dashed: Boolean,
  ghost: Boolean
}

const Button = defineComponent({
  name: 'TuButton',
  props: buttonProps,
  setup(props, context) {
    const buttonRef = ref<Element | null>()
    const waveRef = ref<BaseWaveRef | null>(null)
    const onClick = () => {
      waveRef.value?.triggerWave()
    }

    return () => {
      const { type, size, text, dashed, ghost, circle, round, disabled, icon, loading, iconPosition, nativeType } = props
      const slots = context.slots
      return (
        <button
          ref={buttonRef}
          class={[
            'tu-button',
            {
              [`tu-button--${type}`]: type,
              [`tu-button--${size}`]: size,
              'tu-button--text': text,
              'tu-button--dashed': dashed,
              'tu-button--ghost': ghost,
              'tu-button--circle': circle,
              'tu-button--round': round,
            }
          ]}
          type={nativeType}
          disabled={disabled}
          onClick={onClick}
        >
          <TuExpandTransition>
            { icon || loading ? (
              <span
                class={[
                  'tu-button__icon',
                  {
                    [`tu-icon--${iconPosition}`]: iconPosition,
                    'tu-icon--empty': !slots.default
                  }
                ]}
              >
                <Transition name="tu-fade" mode="out-in">
                  { loading ? <LoadingIcon /> : <TuIcon name={icon} /> }
                  </Transition>
              </span>
              ) : null }
          </TuExpandTransition>
          {slots.default ? (
            <span class="tu-button__content">
              {slots.default?.()}
            </span>
          ) : null}
          {!text ? (
            <>
              <TuBaseWave ref={waveRef} big={circle} />
              <span class="tu-button__border" />
              <span class="tu-button__state-border" />
            </>
          ) : null}
        </button>
      )
    }
  }
})

export default Button
