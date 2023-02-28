import { defineComponent, withDirectives, vShow, Teleport, Transition, watch, toRef, onMounted, computed, ref, nextTick, shallowRef } from 'vue'
import { modalProps } from './modalProps'
import { disableBodyScroll, enableBodyScroll } from '../../../utils'
import { useNameScope } from '../../../composables/useNameScope'
import { useClickPosition } from '../../../composables/useClickPosition'
import { useIsMounted } from '../../../composables/useIsMounted'

export default defineComponent({
  name: 'TuModal',
  emits: ['update:visible', 'maskClick'],
  props: modalProps,
  setup(props, context) {
    const { emit } = context
    const ns = useNameScope('modal')
    const isMounted = useIsMounted()
    const { emitter, mousePosition } = useClickPosition()

    const modal = shallowRef<HTMLDivElement | null>(null)
    const wrapperVisible = ref(props.visible)
    const transformOriginX = ref<number | null>(null)
    const transformOriginY = ref<number | null>(null)

    const modalStyle = computed(() => mousePosition?.value ? ({
      transformOrigin: `${transformOriginX.value}px ${transformOriginY.value}px`
    }) : void 0)

    watch(toRef(props, 'visible'), (value) => {
      if (value) wrapperVisible.value = true
    })

    function handleEnterModal(el: Element) {
      emitter?.emit('enterModal', () => {
        updateTransformOrigin(el)
      })
    }

    function handleBeforeEnterModal() {
      props.disableScroll && disableBodyScroll()
    }

    function handleAfterLeaveModal() {
      props.disableScroll && enableBodyScroll()
      wrapperVisible.value = false
      props.onAfterLeave?.()
    }

    function handleClickMask(event: Event) {
      emit('maskClick', event)
      props.maskClosable && close()
    }

    function updateTransformOrigin(el: Element) {
      if (!mousePosition?.value) return
      const { offsetLeft, offsetTop } = el as HTMLElement
      transformOriginX.value = (offsetLeft - mousePosition.value.x) * -1
      transformOriginY.value = (offsetTop - mousePosition.value.y) * -1
    }

    function close() {
      emit('update:visible', false)
    }

    onMounted(() => {
      props.visible && props.disableScroll && disableBodyScroll()
    })

    context.expose({ modal })

    return () => {
      const { attrs, slots } = context
      const Overlay = <div class={ns.el('overlay')} onClick={handleClickMask}></div>
      const Modal = (
        <div class={ns.base} ref={modal} style={modalStyle.value} {...attrs}>
          <div class={ns.el('content')}>
            {slots.default?.({ close })}
          </div>
        </div>
      )
      const ModalWrapper = (
        <div class={ns.suffix('wrapper')}>
          <Transition name={ns.suffix('fade')} appear={isMounted.value}>
            {withDirectives(Overlay, [[vShow, props.visible]])}
          </Transition>
          <Transition
            name={ns.suffix('fade-in-scale-up')}
            onBeforeEnter={handleBeforeEnterModal}
            onEnter={handleEnterModal}
            onAfterEnter={props.onAfterEnter}
            onAfterLeave={handleAfterLeaveModal}
            appear={isMounted.value}
          >
            {withDirectives(Modal, [[vShow, props.visible]])}
          </Transition>
        </div>
      )

      return (
        <Teleport to="body" disabled={props.disabled}>
          <div class={ns.el('container')} {...attrs}>
            {props.renderDirective === 'if'
              ? wrapperVisible.value ? ModalWrapper : null
              : withDirectives(Modal, [[vShow, wrapperVisible.value]])}
          </div>
        </Teleport>
      )
    }
  }
})
