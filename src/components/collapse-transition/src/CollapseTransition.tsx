import { defineComponent, Transition } from 'vue';
import { addClass, getDataAttr, getStyle, removeClass, setStyle } from '../../../utils'

const transitionClass = 'tu-collapse-transition--active'

const CollapseTransition = defineComponent({
  name: 'TuCollapseTransition',
  setup(_props, context) {
    function beforeEnter(el: Element) {
      console.log("getStyle(el, 'marginTop')")
      console.log(getStyle(el, 'marginTop'))
      el.setAttribute('data-old-margin-top', getStyle(el, 'marginTop'))
      el.setAttribute('data-old-margin-bottom', getStyle(el, 'marginBottom'))
      addClass(el, transitionClass)
      setStyle(el, {
        height: '0',
        overflow: 'hidden',
        marginTop: '0',
        marginBottom: '0',
      })
    }
  
    function enter(el: Element) {
      void el.scrollHeight
      setStyle(el, {
        height: `${el.scrollHeight}px`,
        marginTop: el.getAttribute('data-old-margin-top')!,
        marginBottom: el.getAttribute('data-old-margin-bottom')!
      })
    }
  
    function afterEnter(el: Element) {
      removeClass(el, transitionClass)
      setStyle(el, { height: '', overflow: '' })
    }
  
    function beforeLeave(el: Element) {
      el.setAttribute('data-old-margin-top', getStyle(el, 'marginTop'))
      el.setAttribute('data-old-margin-bottom', getStyle(el, 'marginBottom'))
      setStyle(el, {
        height: `${el.scrollHeight}px`,
        overflow: 'hidden'
      })
    }
  
    function leave(el: Element) {
      void el.scrollHeight
      addClass(el, transitionClass)
      setStyle(el, {
        height: '0',
        marginTop: '0',
        marginBottom: '0',
      })
    }
  
    function afterLeave(el: Element) {
      removeClass(el, transitionClass)
      console.log("el.getAttribute('data-old-margin-top')")
      console.log(el.getAttribute('data-old-margin-top'))
      setStyle(el, {
        height: '',
        overflow: '',
        marginTop: el.getAttribute('data-old-margin-top')!,
        marginBottom: el.getAttribute('data-old-margin-bottom')!
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

export default CollapseTransition