import '../../styles/col.styl'
import { isObject } from '../../src/utils/types.js'
const mediaValidator = (value) => {
  let valid = true
  if (isObject(value)) {
    for (const key of Object.keys(value)) {
      if (!['span', 'offset'].includes(key)) {
        valid = false
        break
      }
    }
  }
  return value >= 0 && value <= 24 || valid
}

export default {
  name: 'TCol',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    },
    // 屏幕 ≥ 1600px
    xxl: {
      type: [Number, Object],
      default: 0,
      validator: mediaValidator
    },
    // 屏幕 ≥ 1200px
    xl: {
      type: [Number, Object],
      default: 0,
      validator: mediaValidator
    },
    // 屏幕 ≥ 992px
    lg: {
      type: [Number, Object],
      default: 0,
      validator: mediaValidator
    },
    // 屏幕 ≥ 768px
    md: {
      type: [Number, Object],
      default: 0,
      validator: mediaValidator
    },
    // 屏幕 ≥ 576px
    sm: {
      type: [Number, Object],
      default: 0,
      validator: mediaValidator
    }
  },
  data() {
    return {
      gutter: 0
    }
  },
  computed: {
    gutterStyle() {
      const gutter = this.gutter
      if (!gutter) return
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`
      }
    },
    classList() {
      const base = {}

      ;['span', 'offset'].forEach(prop => {
        const number = this[prop]
        if (prop === 'span') {
          base[`tulp-col-${number}`] = number
        } else {
          base[`tulp-col-${prop}-${number}`] = number
        }
      })

      ;['sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
        const props = this[size]
        if (props) {
          if (typeof props === 'number') {
            base[`tulp-col-${size}-${props}`] = props
          } else if (isObject(props)) {
            Object.keys(props).forEach(prop => {
              if (prop === 'span') {
                base[`tulp-col-${size}-${props[prop]}`] = props[prop]
              } else {
                base[`tulp-col-${prop}-${size}-${props[prop]}`] = props[prop]
              }
            })
          }
        }
      })

      return base
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['tulp-col', this.classList],
      style: this.gutterStyle
    }, this.$slots.default)
  }
}
