import { defineComponent, computed, withDirectives, vModelDynamic, type PropType, h, ref } from 'vue'
import { toPx } from '../../../utils'
import ImagePreview from './ImagePreview'

export const imageProps = {
  src: {
    type: String as PropType<string>,
    require: true
  },
  previewSrc: String as PropType<string>,
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
    const previewVisible = ref(false)
    const styles = computed(() => ({
      height: toPx(props.height),
      width: toPx(props.width)
    }))

    function openPreview() {
      previewVisible.value = true
    }

    function onUpdateVisible(value: boolean) {
      previewVisible.value = value
    }

    return () => {
      const Image = <img style={{ objectFit: props.objectFit }} src={props.src} alt={props.alt}/>
      return (
        <>
          <div class="tu-image" style={styles.value} onClick={openPreview}>
            {h(Image, { class: 'tu-image-inner' })}
          </div>
          {h(ImagePreview, {
            visible: previewVisible.value,
            previewSrc: props.previewSrc,
            src: props.src,
            alt: props.alt,
            'onUpdate:visible': onUpdateVisible
          })}
        </>
      )
    }
  }
})

export default Image
