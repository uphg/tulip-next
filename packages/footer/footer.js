export default {
  name: 'TFooter',
  props: {
    tag: {
      type: String,
      default: 'footer'
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-footer']
    }, this.$slots.default)
  }
}
