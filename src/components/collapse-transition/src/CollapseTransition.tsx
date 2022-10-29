import { defineComponent, Transition } from 'vue';
import { addClass, removeClass, setStyle } from '../../../utils'

const transitionClass = 'tu-collapse-transition--active'

const CollapseTransition = defineComponent({
  name: 'TuCollapseTransition',
  setup(_props, context) {
    function beforeEnter(el: Element) {
      addClass(el, transitionClass)
      setStyle(el, { height: '0', overflow: 'hidden' })
    }
  
    function enter(el: Element) {
      void el.scrollHeight
      setStyle(el, { height: `${el.scrollHeight}px` })
    }
  
    function afterEnter(el: Element) {
      removeClass(el, transitionClass)
      setStyle(el, { height: '', overflow: '' })
    }
  
    function beforeLeave(el: Element) {
      setStyle(el, {
        height: `${el.scrollHeight}px`,
        overflow: 'hidden'
      })
    }
  
    function leave(el: Element) {
      void el.scrollHeight
      addClass(el, transitionClass)
      setStyle(el, { height: '0' })
    }
  
    function afterLeave(el: Element) {
      removeClass(el, transitionClass)
      const overflow = el.getAttribute('oldOverflow') || ''
      setStyle(el, { overflow, height: '' })
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