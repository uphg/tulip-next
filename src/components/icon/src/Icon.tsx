import { defineComponent } from "vue";
import { useIcons } from '../../../icons/useIcons'

const iconProps = {
  name: String
}

const Icon = defineComponent({
  name: 'TuIcon',
  props: iconProps,
  setup(props) {
    useIcons(window)
    return () => (
      <svg class={{ [`tu-icon-${props.name}`]: props.name }} aria-hidden="true">
        <use xlink:href={`#tu-icon-${props.name}`} />
      </svg>
    )
  }
})

export default Icon
