import {
  defineComponent,
  withDirectives,
  vShow,
  Teleport,
  Transition,
  watch,
  toRef,
  // h,
  // Fragment,
} from 'vue';
import type { PropType } from 'vue'
import { offBodyScroll, onBodyScroll } from '../../../utils'

export default defineComponent({
  name: `TDialog`,
  emits: ['update:visible', 'open', 'opened', 'close', 'closed', 'maskClick'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: String,
    renderDirective: {
      type: String as PropType<'if' | 'show'>,
      default: 'if'
    },
    wrap: Boolean,
    preset: {
      type: String as PropType<'default' | 'custom'>,
      default: 'default'
    }
  },
  setup(props, context) {
    const openDialog = () => {
      context.emit('open')
      offBodyScroll()
    }

    const closeDialog = () => {
      context.emit('update:visible', false)
      context.emit('close')
    }

    const handleBeforeLeave = () => {
      context.emit('opened')
    }

    const handleAfterLeave = () => {
      context.emit('closed')
      onBodyScroll()
    }

    const handleMaskClick = (event: Event) => {
      context.emit('maskClick', event)
      props.maskClosable && closeDialog()
    }

    watch(toRef(props, 'visible'), value => {
      value && openDialog()
    })

    return () => {
      const content = (
        <div
          class="tu-dialog__container"
          {...context.attrs}
        >
          <div
            class="tu-dialog__overlay"
            onClick={handleMaskClick}
          ></div>
          <div class="tu-dialog">
            {
              props.preset === 'default' ? (
                <div class="tu-dialog__content">
                  <div class="tu-dialog__header">
                    {
                      !context.slots.header ? (
                        <>
                          <span class="tu-dialog__title">{props.title}</span>
                          <span class="tu-dialog__close" onClick={closeDialog}></span>
                        </>
                      ) : (
                        context.slots.header?.()
                      )
                    }
                  </div>
                  <div class="tu-dialog__body">
                    {context.slots.default?.()}
                  </div>
                  <div class="tu-dialog__footer">
                    {context.slots.footer?.()}
                  </div>
                </div>
              ) : (
                props.preset === 'custom' ?  context.slots.default?.() : null
              )
            }
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
