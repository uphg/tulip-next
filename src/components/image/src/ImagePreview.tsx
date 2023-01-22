import { defineComponent, computed, type PropType, Teleport, h, ref,nextTick, onMounted, Transition, provide, inject, type Ref, readonly } from 'vue'
import { TuBaseIcon } from '../../base-icon'
import { ArrowPrevious, ArrowNext, ArrowClockwise, ArrowCounterclockwise, MagnifierMinus, MagnifierPlus, ExpandOutlined, Close } from '../../../icons'
import type { ImageGroupHandle } from './ImageGroup'

type ScaleType = keyof typeof scaleMap

const scaleMap = {
  0: 0.25,
  1: 0.5,
  2: 0.75,
  3: 1,
  4: 1.5,
  5: 2.25,
  6: 3
}

const imagePreviewProps = {
  visible: Boolean as PropType<boolean>,
  src: String as PropType<string>,
  previewSrc: String as PropType<string>,
  alt: String as PropType<string>
}

const ImagePreview = defineComponent({
  name: 'TuImagePreview',
  props: imagePreviewProps,
  emits: ['update:visible'],
  setup(props, context) {
    const index = ref(0)
    const scaleType = ref<ScaleType>(3)
    const rotate = ref(0)
    const previewSrc = computed(() => {
      if (!imageGroupHandle) return (props.previewSrc || props.src)
      const { images, active } = imageGroupHandle
      return images.value[active.value]
    })

    const imageGroupHandle = inject<ImageGroupHandle | null>('tu.imageGroupHandle', null)

    function handleClickOverlay(e: Event) {
      e.preventDefault()
      e.stopPropagation()
      close()
    }

    function close() {
      context.emit('update:visible', false)
    }

    function zoomIn() {
      const newValue = scaleType.value + 1
      if (newValue > 6) return
      scaleType.value = newValue as ScaleType
    }

    function zoomOut() {
      const newValue = scaleType.value - 1
      if (newValue < 0) return
      scaleType.value = newValue as ScaleType
    }

    function resetImage() {
      scaleType.value = 3
      rotate.value = 0
    }

    function clockwiseRotation() {
      rotate.value += 90
    }

    function anticlockwiseRotation() {
      rotate.value -= 90
    }

    function prevImage() {
      resetImage()
      const { setActive, active, images } = imageGroupHandle!
      setActive(active.value === 0 ? (images.value.length - 1) : active.value - 1)
    }

    function nextImage() {
      resetImage()
      const { setActive, active, images } = imageGroupHandle!
      setActive(active.value === (images.value.length - 1) ? 0 : active.value + 1)
    }

    function handleBeforeEnter() {
      imageGroupHandle?.setActive(index.value)
    }

    function handleAfterLeave() {
      resetImage()
    }


    function updateImageGroup() {
      if (!imageGroupHandle) return
      const src = props.previewSrc || props.src
      const { setImages, setActive, images } = imageGroupHandle

      if (!src || !setActive) return
      const length = images.value.length
      index.value = length
      setActive(length)
      setImages(length, src)
    }

    updateImageGroup()

    return () => (
      <Teleport to="body">
        <Transition name="tu-image-fade" onBeforeEnter={handleBeforeEnter} onAfterLeave={handleAfterLeave}>
          {props.visible ? (
            <div class='tu-image-preview-container'>
              <div class="tu-image-preview-overlay" onClick={handleClickOverlay}></div>
              <div key={`${previewSrc.value}-${index.value}`} class="tu-image-preview-wrapper">
                <img class="tu-image-preview"
                  style={{ transform: `rotate(${rotate.value}deg) scale(${[scaleMap[scaleType.value]]})` }}
                  src={previewSrc.value}
                  alt={props.alt}/>
              </div>
              <div class="tu-image-preview-toolbar">
                {imageGroupHandle?.images.value.length ? [
                  <TuBaseIcon is={ArrowPrevious} onClick={prevImage}/>,
                  <TuBaseIcon is={ArrowNext} onClick={nextImage}/>
                ]: null}
                <TuBaseIcon is={ArrowClockwise} onClick={clockwiseRotation}/>
                <TuBaseIcon is={ArrowCounterclockwise} onClick={anticlockwiseRotation}/>
                <TuBaseIcon is={ExpandOutlined} onClick={resetImage}/>
                <TuBaseIcon is={MagnifierMinus} onClick={zoomOut}/>
                <TuBaseIcon is={MagnifierPlus} onClick={zoomIn}/>
                <TuBaseIcon is={Close} onClick={close}/>
              </div>
            </div>
          ) : null}
        </Transition>
      </Teleport>
    )
  }
})

export default ImagePreview