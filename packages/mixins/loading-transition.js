import dom from '../../src/utils/dom'

const TRANSITION_CLASS = 'tulp-width-expand-transition-active'
export default {
  methods: {
    loadingBeforeEnter(el) {
      dom.addClass(el, TRANSITION_CLASS)
      el.style.width = '0'
      el.style.opacity = '0'
    },

    loadingEnter(el) {
      console.log('123')
      if (el.scrollWidth !== 0) {
        el.style.width = el.scrollWidth + 'px'
      } else {
        el.style.width = ''
      }
      el.style.opacity = '1'
    },

    loadingAfterEnter(el) {
      dom.removeClass(el, TRANSITION_CLASS)
      el.style.width = ''
      el.style.opacity = ''
    },

    loadingBeforeLeave(el) {
      el.style.width = ''
      el.style.opacity = ''
    },

    loadingLeave(el) {
      if (el.scrollWidth !== 0) {
        dom.addClass(el, TRANSITION_CLASS)
        el.style.width = '0'
      }
    },
    loadingAfterLeave(el) {
      dom.removeClass(el, TRANSITION_CLASS)
      el.style.width = ''
    }
  }
}
// export default {
//   methods: {

//     loadingEnter(el, done) {
//       if (this.icon) {

//       } else {
//         if (el.scrollWidth !== 0) {
//           el.classList.add('active')
//         }
//       }
//     },

//     loadingLeave(el, done) {
//       if (this.icon) {

//       } else {
//         el.classList.remove('active')
//       }
//     }
//   }
// }
