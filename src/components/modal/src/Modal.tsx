import { defineComponent, withDirectives, vShow, Teleport, Transition, watch, toRef, onMounted, computed, ref, nextTick, shallowRef } from 'vue'
import { disableBodyScroll, enableBodyScroll } from '../../../utils'
import { useNameScope } from '../../../composables/useNameScope'
import { modalProps } from './modalProps'
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
    const { emitter, mousePosition } = useClickPosition() || {}

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

    function handleBeforeEnterWrapper() {
      props.disableScroll && disableBodyScroll()
    }

    function handleAfterEnterWrapper() {
      props.onAfterOpen?.()
    }

    function handleAfterLeaveWrapper() {
      props.disableScroll && enableBodyScroll()
      wrapperVisible.value = false
      props.onAfterClose?.()
    }

    function handleClickMask(event: Event) {
      emit('maskClick', event)
      props.maskClosable && close()
    }

    function handleEnterModal(el: Element) {
      emitter?.emit('enterModal', () => {
        updateTransformOrigin(el)
      })
    }

    function updateTransformOrigin(el: Element) {
      if (!mousePosition?.value) return
      const { top, left } = el.getBoundingClientRect()
      transformOriginX.value = (left - mousePosition.value.x) * -1
      transformOriginY.value = (top - mousePosition.value.y) * -1
    }

    function close() {
      emit('update:visible', false)
    }

    onMounted(() => {
      props.visible && props.disableScroll && disableBodyScroll()
    })

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
          <Transition
            name={ns.suffix('fade')}
            onBeforeEnter={handleBeforeEnterWrapper}
            onAfterEnter={handleAfterEnterWrapper}
            onAfterLeave={handleAfterLeaveWrapper}
            appear={isMounted.value}
          >
            {{
              default: () => {
                if (props.renderDirective === 'if') {
                  return (props.visible ? Overlay : null)
                } else if (props.renderDirective === 'show') {
                  return withDirectives(Overlay, [[vShow, props.visible]])
                }
              }
            }}
          </Transition>
          <Transition name="tu-modal-fade-scale-up" onEnter={handleEnterModal} appear={isMounted.value}>
            {{
              default: () => {
                if (props.renderDirective === 'if') {
                  return (props.visible ? Modal : null)
                } else if (props.renderDirective === 'show') {
                  return withDirectives(Modal, [[vShow, props.visible]])
                }
              }
            }}
          </Transition>
        </div>
      )

      return (
        <Teleport to="body" disabled={props.disabled}>
          <div class={ns.el('container')} {...attrs}>
            {wrapperVisible.value ? ModalWrapper : null}
          </div>
        </Teleport>
      )
    }
  }
})
