import dom from '../utils/dom'

const TRANSITION_CLASS = 'tulp-width-expand-transition-active'
export default {
  methods: {
    iconBeforeEnter(el) {
      dom.addClass(el, TRANSITION_CLASS)
      el.style.width = '0'
      el.style.opacity = 0
    },

    iconEnter(el) {
      if (el.scrollWidth !== 0) {
        el.style.width = el.scrollWidth + 'px'
        el.style.opacity = 1
      } else {
        el.style.width = ''
        el.style.opacity = 1
      }
    },

    iconAfterEnter(el) {
      dom.removeClass(el, TRANSITION_CLASS)
      el.style.width = ''
      el.style.opacity = ''
    },

    iconBeforeLeave(el) {
      el.style.width = ''
      el.style.opacity = ''
    },

    iconLeave(el) {
      if (el.scrollWidth !== 0) {
        dom.addClass(el, TRANSITION_CLASS)
        el.style.width = '0'
        el.style.opacity = '0'
      }
    },

    iconAfterLeave(el) {
      dom.removeClass(el, TRANSITION_CLASS)
      el.style.width = ''
      el.style.opacity = ''
    }
  }
}
