import hash from './icon-svg-data.js'
export default {
  name: 'TIconSvg',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  render(h) {
    const { name } = this
    const vNode = hash[name]
    return h(
      'svg',
      {
        class: `icon-${name}`,
        attrs: {
          ...vNode['svg'],
          fill: 'currentColor'
        }
      },
      vNode['path'].map(attrs => h('path', { attrs }))
    )
  }
}
