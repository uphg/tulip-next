import { defineComponent, withDirectives, vShow, Teleport, Transition, watch, toRef } from 'vue';
import { offBodyScroll, onBodyScroll } from '../../../utils'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'TuDialog',
  emits: ['update:visible', 'open', 'opened', 'close', 'closed', 'maskClick'],
  props: {
    visible: Boolean as PropType<boolean>,
    title: String as PropType<string>,
    maskClosable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    renderDirective: {
      type: String as PropType<'if' | 'show'>,
      default: 'if'
    },
    wrap: Boolean as PropType<boolean>,
    custom: Boolean as PropType<boolean>
  },
  setup(props, context) {
    const { emit } = context
    const openDialog = () => {
      emit('open')
      offBodyScroll()
    }

    const closeDialog = () => {
      emit('update:visible', false)
      emit('close')
    }

    const handleBeforeLeave = () => {
      emit('opened')
    }

    const handleAfterLeave = () => {
      emit('closed')
      onBodyScroll()
    }

    const handleMaskClick = (event: Event) => {
      emit('maskClick', event)
      props.maskClosable && closeDialog()
    }

    watch(toRef(props, 'visible'), value => {
      value && openDialog()
    })

    return () => {
      const { attrs, slots } = context
      const content = (
        <div
          class="tu-dialog__container"
          {...attrs}
        >
          <div
            class="tu-dialog__overlay"
            onClick={handleMaskClick}
          ></div>
          <div class="tu-dialog">
            {!props.custom ? (
              <div class="tu-dialog__content">
                <div class="tu-dialog__header">
                  {!slots.header ? (
                      <>
                        <span class="tu-dialog__title">{props.title}</span>
                        <span class="tu-dialog__close" onClick={closeDialog}></span>
                      </>
                    ) : (slots.header?.())}
                </div>
                <div class="tu-dialog__body">
                  {slots.default?.()}
                </div>
                <div class="tu-dialog__footer">
                  {slots.footer?.()}
                </div>
              </div>
              ) : (props.custom ? slots.default?.() : null)}
          </div>
        </div>
      )
      return (
        <Teleport to="body" disabled={props.wrap}>
          <Transition
            name="dialog-fade"
            onAfterLeave={handleAfterLeave}
            onBeforeLeave={handleBeforeLeave}
          >
            {{
              default: () => {
                if (props.renderDirective === 'if') {
                  return (props.visible ? content : null)
                } else if (props.renderDirective === 'show') {
                  return withDirectives(
                    content,
                    [
                      [vShow, props.visible]
                    ]
                  )
                }
              }
            }}
          </Transition>
        </Teleport>
      )
    }
  }
})
