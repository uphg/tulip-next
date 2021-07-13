export default {
  name: 'THeader',
  props: {
    tag: {
      type: String,
      default: 'header'
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-header']
    }, this.$slots.default)
  }
}
