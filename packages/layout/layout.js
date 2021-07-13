export default {
  name: 'TLayout',
  props: {
    tag: {
      type: String,
      default: 'section'
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-layout']
    }, this.$slots.default)
  }
}
