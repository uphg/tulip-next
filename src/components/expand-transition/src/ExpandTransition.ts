import { defineComponent, h, ref, Transition, TransitionGroup, type Component, type PropType } from 'vue'

export const ExpandTransition = defineComponent({
  name: 'TuExpandTransition',
  props: {
    mode: String as PropType<'in-out' | 'out-in' | 'default'>,
    appear: Boolean as PropType<boolean>,
    withWidth: Boolean as PropType<boolean>,
    withGroup: Boolean as PropType<boolean>
  },
  setup(props, context) {
    const leaving = ref(false)
    const momeHeight = ref(0)
    const momeWidth = ref(0)

    function handleEnter(el: HTMLElement) {
      el.style.transition = 'none'
      if (props.withWidth) {
        if (!leaving.value) {
          momeWidth.value = el.offsetWidth
        }
        el.style.width = '0'
        void el.offsetWidth
        el.style.transition = ''
        el.style.width = `${momeWidth.value}px`
      } else {
        if (!leaving.value) {
          momeHeight.value = el.offsetHeight
        }
        el.style.height = '0'
        void el.offsetHeight
        el.style.transition = ''
        el.style.height = `${momeHeight.value}px`
      }
      void el.offsetWidth
    }

    function handleAfterEnter(el: HTMLElement) {
      el.style[props.withWidth ? 'width' : 'height'] = ''
    }

    function handleBeforeLeave(el: HTMLElement) {
      leaving.value = true
      if (props.withWidth) {
        el.style.width = `${el.offsetWidth}px`
      } else {
        el.style.height = `${el.offsetHeight}px`
      }
    }

    function handleLeave(el: HTMLElement) {
      void el.offsetWidth
      if (props.withWidth) {
        el.style.width = '0'
      } else {
        el.style.height = '0'
      }
    }

    function handleAfterLeave(el: HTMLElement) {
      el.style[props.withWidth ? 'width' : 'height'] = ''
      leaving.value = false
    }

    return () => {
      const type = (props.withGroup ? TransitionGroup : Transition) as Component 
      return h(type, {
        name: `tu-fade-in-${props.withWidth ? 'width' : 'height'}-expand-transition`,
        mode: props.mode,
        appear: props.appear,
        onEnter: handleEnter,
        onAfterEnter: handleAfterEnter,
        onBeforeLeave: handleBeforeLeave,
        onLeave: handleLeave,
        onAfterLeave: handleAfterLeave
      }, context.slots)
    }
  }
})

export default ExpandTransition
