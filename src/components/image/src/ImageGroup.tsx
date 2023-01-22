import { defineComponent, provide, readonly, ref, type Ref } from 'vue'

export type ImageGroupHandle = {
  images: Readonly<Ref<string[]>>
  active: Readonly<Ref<number>>
  setImages: (index: number, value: string) => void
  setActive: (value: number) => void
}

const ImageGroup = defineComponent({
  name: 'TuImageGroup',
  setup(_, context) {
    const images = ref<string[]>([])
    const active = ref(0)

    provide('tu.imageGroupHandle', {
      images: readonly(images),
      active: readonly(active),
      setImages(index: number, value: string) {
        images.value[index] = value
      },
      setActive(value: number) {
        active.value = value
      }
    })

    return () => (
      <div class="tu-image-group">{context.slots.default?.()}</div>
    )
  }
})

export default ImageGroup