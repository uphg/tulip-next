import { defineComponent, computed, type PropType } from 'vue'
import { toPx } from '../../../utils'

export const imageProps = {
  src: {
    type: String as PropType<string>,
    require: true
  },
  alt: String as PropType<string>,
  objectFit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    default: 'fill'
  },
  width: [String, Number] as PropType<string | number>,
  height: [String, Number] as PropType<string | number>,
} 

const Image = defineComponent({
  name: 'TuImage',
  props: imageProps,
  setup(props) {
    const styles = computed(() => ({
      height: toPx(props.height),
      width: toPx(props.width)
    }))

    return () => (
      <div class='tu-image' style={styles.value}>
        <img class="tu-image-inner" style={{ objectFit: props.objectFit }} src={props.src} alt={props.alt}/>
      </div>
    )
  }
})

export default Image
