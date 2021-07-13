export default {
  name: 'TAside',
  props: {
    tag: {
      type: String,
      default: 'aside'
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-aside']
    }, this.$slots.default)
  }
}
