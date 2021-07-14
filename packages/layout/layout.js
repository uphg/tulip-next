import '../../styles/layout.styl'
export default {
  name: 'TLayout',
  props: {
    tag: {
      type: String,
      default: 'section'
    },
    // 可选值: vertical/horizontal
    direction: String
  },
  computed: {
    hasAside() {
      if (this.direction === 'vertical') return true
      if (this.direction === 'horizontal') return false
      const slots = this.$slots
      return slots && slots.default ? slots.default.some(vnode => vnode.componentOptions && vnode.componentOptions.tag === 't-aside') : false
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-layout', { 'is-vertical': this.hasAside }]
    }, this.$slots.default)
  }
}
