import { defineComponent, computed, type PropType, Teleport, h, ref,nextTick, onMounted, Transition } from 'vue'
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

    const previewVisible = ref(false)

    function handleClick() {
      openPreview()
    }

    function handleClickOverlay(e: Event) {
      e.preventDefault()
      e.stopPropagation()
      closePreview()
    }

    function openPreview() {
      noScrolling()
      nextTick(() => {})
      previewVisible.value = true
    }

    function closePreview() {
      // scrolling()
      previewVisible.value = false
    }

    function noScrolling() {
      document.documentElement.style.overflow = 'hidden'
    }

    function scrolling() {
      document.documentElement.style.overflow = ''
    }

    return () => {
      const Image = <img style={{ objectFit: props.objectFit }} src={props.src} alt={props.alt}/>
      return [
        <div class='tu-image' style={styles.value} onClick={handleClick}>
          {h(Image, { class: 'tu-image-inner' })}
        </div>,
        <Teleport to="body">
          <Transition name="tu-image-fade" onAfterLeave={scrolling}>
            {previewVisible.value ? (
              <div class='tu-image-preview-container'>
                <div class="tu-image-preview-overlay" onClick={handleClickOverlay}></div>
                <div class="tu-image-preview-wrapper">
                  {h(Image, { class: 'tu-image-preview' })}
                </div>
              </div>
            ) : null}
          </Transition>
          
        </Teleport>
      ]
    }
  }
})

export default Image
