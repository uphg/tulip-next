export default {
  methods: {
    loadingTransitionEnter(el, done) {
      let loadId = setTimeout(() => {
        el.classList.add('active')
        window.clearTimeout(loadId)
        loadId = null
      }, 0)
    },

    loadingTransitionLeave(el, done) {
      el.classList.remove('active')
    }
  }
}
