import '../../styles/row.styl'

export default {
  name: 'TRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    justify: {
      type: String,
      validator(value) {
        return ['start', 'center', 'end', 'space-between', 'space-around'].includes(value)
      }
    }
  },
  computed: {
    gutterStyle() {
      const gutter = this.gutter
      if (!gutter) return
      return { marginLeft: `-${gutter / 2}px`, marginRight: `-${gutter / 2}px` }
    }
  },
  mounted() {
    this.$children.forEach(vm => {
      vm.gutter = this.gutter
    })
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-row', { [`is-justify-${this.justify}`]: this.justify }],
      style: this.gutterStyle
    }, this.$slots.default)
  }
}
