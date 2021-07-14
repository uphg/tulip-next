import '../../styles/aside.styl'

export default {
  name: 'TAside',
  props: {
    tag: {
      type: String,
      default: 'aside'
    },
    width: String
  },
  render(h) {
    if (this.$parent.$options.name === 'TLayout') {
      this.$parent._hasAside = true
    }
    return h(this.tag, {
      class: ['tulp-aside'],
      style: { width: this.width }
    }, this.$slots.default)
  }
}
