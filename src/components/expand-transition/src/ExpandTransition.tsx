import { defineComponent, Transition } from 'vue'
import { addClass, removeClass, setStyle } from '../../../utils'

const transitionClass = 'tu-expand-transition--active'

const ExpandTransition = defineComponent({
  setup(_props, context) {
    function beforeEnter(el: Element) {
      addClass(el, transitionClass)
      setStyle(el, {
        width: '0',
        marginLeft: '0',
        marginRight: '0'
      })
    }
  
    function enter(el: Element) {
      el.setAttribute('oldOverflow', (el as HTMLElement).style.overflow)
      void el.scrollWidth
      setStyle(el, {
        width: '',
        marginLeft: '',
        marginRight: '',
        overflow: 'hidden'
      })
    }
  
    function afterEnter(el: Element) {
      removeClass(el, transitionClass)
      setStyle(el, {
        width: '',
        overflow: String(el.getAttribute('oldOverflow')),
      })
    }
  
    function beforeLeave(el: Element) {
      setStyle(el, {
        width: `${(el as HTMLElement).offsetWidth}px`,
        overflow: 'hidden'
      })
    }
  
    function leave(el: Element) {
      void el.scrollWidth
      addClass(el, transitionClass)
      setStyle(el, {
        width: '0',
        marginLeft: '0',
        marginRight: '0'
      })
    }
  
    function afterLeave(el: Element) {
      removeClass(el, transitionClass)
      setStyle(el, {
        overflow: String(el.getAttribute('oldOverflow')),
        width: '',
        marginLeft: '',
        marginRight: '',
      })
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

export default ExpandTransition