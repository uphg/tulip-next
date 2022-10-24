import { defineComponent, Transition, renderSlot } from 'vue';
import { addClass, removeClass, setStyle } from '../../../utils'

const transitionClass = 'tu-collapse-transition--active'

const CollapseTransition = defineComponent({
  name: 'TCollapseTransition',
  setup(_props, context) {
    function beforeEnter(el: Element) {
      console.log('进入动画 --- 执行前')
      addClass(el, transitionClass)
      setStyle(el, { height: '0', overflow: 'hidden' })
    }
  
    function enter(el: Element) {
      console.log('进入动画 --- 执行中')
      nextFrame(el)
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
      nextFrame(el)
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
        {renderSlot(context.slots, 'default')}
      </Transition>
    )
  }
})

function nextFrame(el: Element) {
  return void el.scrollHeight
}

export default CollapseTransition