import { defineComponent, type PropType } from 'vue'
import { CloseSmall } from '../../../icons'
import { TuBaseIcon } from '../../base-icon'

const BaseClose = defineComponent({
  name: 'TuBaseClose',
  props: {
    size: {
      type: String as PropType<'small' | 'medium'>,
      default: 'medium'
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    disabled: Boolean as PropType<boolean>
  },
  setup(props) {
    return () => (
      <button class={['tu-base-close', {
        [`tu-base-close--${props.size}`]: props.size,
        [`tu-base-close--disabled`]: props.disabled
      }]} tabindex="0" onClick={props.onClick}>
        <TuBaseIcon is={CloseSmall}/>
      </button>
    )
  }
})

export default BaseClose