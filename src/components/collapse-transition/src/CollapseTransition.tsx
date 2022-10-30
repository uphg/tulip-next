import { defineComponent, ref, Transition } from 'vue';
import { addClass, getStyle, removeClass, setStyle } from '../../../utils'

const transitionClass = 'tu-collapse-transition--active'

const CollapseTransition = defineComponent({
  name: 'TuCollapseTransition',
  setup(_props, context) {
    const enterStatus = ref(false)
    const leaveStatus = ref(false)

    // 进入动画 - 执行前
    function beforeEnter(el: Element) {
      enterStatus.value = true
      if (!leaveStatus.value) {
        el.setAttribute('data-old-margin-top', getStyle(el, 'marginTop'))
        el.setAttribute('data-old-margin-bottom', getStyle(el, 'marginBottom'))
      }
      addClass(el, transitionClass)
      setStyle(el, { height: '0', marginTop: '0', marginBottom: '0' })
    }
  
    // 进入动画 - 执行中
    function enter(el: Element) {
      void el.scrollHeight
      const marginTop = el.getAttribute('data-old-margin-top') || ''
      const marginBottom = el.getAttribute('data-old-margin-bottom') || ''
      setStyle(el, { height: `${el.scrollHeight}px`, marginTop, marginBottom })
    }
  
    // 进入动画 - 执行后
    function afterEnter(el: Element) {
      enterStatus.value = false
      removeClass(el, transitionClass)
      setStyle(el, { height: '' })
    }
  
    // 离开动画 - 执行前
    function beforeLeave(el: Element) {
      leaveStatus.value = true
      if(!leaveStatus.value) {
        el.setAttribute('data-old-margin-top', getStyle(el, 'marginTop'))
        el.setAttribute('data-old-margin-bottom', getStyle(el, 'marginBottom'))
      }
      setStyle(el, { height: `${el.scrollHeight}px` })
    }
  
    // 离开动画 - 执行中
    function leave(el: Element) {
      void el.scrollHeight
      addClass(el, transitionClass)
      setStyle(el, {
        height: '0',
        marginTop: '0',
        marginBottom: '0',
      })
    }
  
    // 离开动画 - 执行后
    function afterLeave(el: Element) {
      leaveStatus.value = false
      removeClass(el, transitionClass)
      const marginTop = el.getAttribute('data-old-margin-top') || ''
      const marginBottom = el.getAttribute('data-old-margin-bottom') || ''
      setStyle(el, { height: '', marginTop, marginBottom })
    }

    return () => (
      <Transition
        onBeforeEnter={beforeEnter}
        onEnter={enter}
        onAfterEnter={afterEnter}
        onBeforeLeave={beforeLeave}
        onLeave={leave}
        onAfterLeave={afterLeave}
      >
        {context.slots.default?.()}
      </Transition>
    )
  }
})

export default CollapseTransition