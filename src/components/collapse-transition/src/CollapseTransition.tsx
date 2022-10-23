import {
  defineComponent,
  Transition,
  renderSlot,
  // onMounted,
  // ref,
  // h,
  // Fragment,
} from 'vue';
import { addClass, removeClass, setStyle } from '../../../utils'

const TRANSITION_CLASS = 'tu-collapse-transition--active'

const CollapseTransition = defineComponent({
  name: 'TCollapseTransition',
  setup(_props, context) {
    function beforeEnter(el: Element) {
      console.log('进入动画 --- 执行前')
      addClass(el, TRANSITION_CLASS)
      setStyle(el, {
        height: '0',
        overflow: 'hidden'
      })
    }
  
    // 进入动画 --- 执行中
    function enter(el: Element) {
      console.log('进入动画 --- 执行中')
      nextFrame(el)
      // const height = el.scrollHeight
      // el.style.height = `${height}px`
      setStyle(el, {
        height: ''
      })
      // el.style.overflow = 'hidden'
    }
  
    // 进入动画 --- 执行后
    function afterEnter(el: Element) {
      removeClass(el, TRANSITION_CLASS)
      // el.style.height = ''
      setStyle(el, {
        overflow: ''
      })
    }
  
    // 离开动画 --- 执行前
    function beforeLeave(el: Element) {
      setStyle(el, {
        height: `${el.scrollHeight}px`,
        overflow: 'hidden'
      })
    }
  
    // 离开动画 --- 执行中
    function leave(el: Element) {
      nextFrame(el)
      addClass(el, TRANSITION_CLASS)
      setStyle(el, {
        height: '0'
      })
    }
  
    // 离开动画 --- 执行后
    function afterLeave(el: Element) {
      removeClass(el, TRANSITION_CLASS)
      setStyle(el, {
        overflow: el.getAttribute('oldOverflow') || '', 
        height: ''
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
        {/* {renderSlot(context.slots, 'default')} */}
        {context.slots.default?.()}
      </Transition>
    )
  }
})

function nextFrame(el: Element) {
  return void el.scrollHeight
}

export default CollapseTransition