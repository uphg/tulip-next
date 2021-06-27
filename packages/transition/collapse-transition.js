import './collapse-transition.styl'
import dom from '../../src/utils/dom'

const TRANSITION_CLASS = 'tulp-collapse-transition-active'

export default {
  name: 'TExpandTransition',
  functional: true,
  render(h, { children }) {
    return h('transition', {
      on: {
        beforeEnter(el) {
          dom.addClass(el, TRANSITION_CLASS)
          if (!el.dataset) el.dataset = {}

          el.dataset.oldPaddingTop = el.style.paddingTop
          el.dataset.oldPaddingBottom = el.style.paddingBottom

          el.style.height = '0'
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
        },

        enter(el) {
          el.dataset.oldOverflow = el.style.overflow

          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px'
          } else {
            el.style.height = ''
          }
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom

          el.style.overflow = 'hidden'
        },

        afterEnter(el) {
          dom.removeClass(el, TRANSITION_CLASS)
          el.style.height = ''
          el.style.overflow = el.dataset.oldOverflow
        },

        beforeLeave(el) {
          if (!el.dataset) el.dataset = {}
          el.dataset.oldOverflow = el.style.overflow
          el.dataset.oldPaddingTop = el.style.paddingTop
          el.dataset.oldPaddingBottom = el.style.paddingBottom

          const padding = (parseInt(el.dataset.oldPaddingTop, 10) + parseInt(el.dataset.oldPaddingBottom, 10)) || 0

          el.style.height = el.scrollHeight - padding + 'px'
          el.style.overflow = 'hidden'
        },

        leave(el) {
          if (el.scrollHeight !== 0) {
            // 在设置高度后添加 class 样式，防止无回弹动画
            dom.addClass(el, TRANSITION_CLASS)
            el.style.height = 0
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
          }
        },

        afterLeave(el) {
          dom.removeClass(el, TRANSITION_CLASS)
          el.style.overflow = el.dataset.oldOverflow
          el.style.height = ''
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        }
      }
    }, children)
  }
}
