import '../../styles/layout.styl'
export default {
  name: 'TLayout',
  props: {
    tag: {
      type: String,
      default: 'section'
    }
  },
  data() {
    return {
      hasAside: false
    }
  },
  mounted() {
    this.updateHasAside()
  },
  updated() {
    this.updateHasAside()
  },
  methods: {
    // 更新 Aside 存在的状态
    updateHasAside() {
      this.hasAside = this.$children && this.$children.filter(vm => vm.$options.name === 'TAside').length > 0
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-layout', { 'is-vertical': this.hasAside }]
    }, this.$slots.default)
  }
}
