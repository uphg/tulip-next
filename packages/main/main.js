import '../../styles/main.styl'

export default {
  name: 'TMain',
  props: {
    tag: {
      type: String,
      default: 'main'
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-main']
    }, this.$slots.default)
  }
}
