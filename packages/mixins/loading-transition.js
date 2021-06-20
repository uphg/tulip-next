export default {
  methods: {
    loadingTransitionEnter(el, done) {
      let loadId = setTimeout(() => {
        el.classList.add('active')
        window.clearTimeout(loadId)
        loadId = null
        let momentId = setTimeout(() => {
          window.clearTimeout(momentId)
          momentId = null
          done()
        }, 300)
      }, 0)
    },

    loadingTransitionLeave(el, done) {
      el.classList.remove('active')
      let momentId = setTimeout(() => {
        window.clearTimeout(momentId)
        momentId = null
        done()
      }, 300)
    }
  }
}
