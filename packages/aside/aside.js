import '../../styles/aside.styl'

export default {
  name: 'TAside',
  props: {
    tag: {
      type: String,
      default: 'aside'
    },
    width: [String, Number]
  },
  render(h) {
    console.log('this.$parent')
    console.log()
    if (this.$parent.$options.name === 'TLayout') {
      this.$parent._hasAside = true
    }
    return h(this.tag, {
      class: ['tulp-aside'],
      style: { width: `${this.width}px` }
    }, this.$slots.default)
  }
}
