<template>
  <div
    class="tulp-col"
    :class="classList"
    :style="gutterStyle"
  >
    <slot />
  </div>
</template>
<script>
import { isObject, isNumber } from '../../src/utils/types.js'
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
        if (prop === 'span') {
          base[`tulp-col-${this[prop]}`] = this[prop]
        } else {
          base[`tulp-col-${prop}-${this[prop]}`] = this[prop]
        }
      })

      ;['sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
        const props = this[size]
        if (props) {
          if (isNumber(props)) {
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
  }
}
</script>
<style lang="stylus">
for num in (1..24)
  .tulp-col-{num}
    width (num / 24) * 100%
for num in (1..24)
  .tulp-col-offset-{num}
    margin-left (num / 24) * 100%
mediaTypes(type)
  for num in (1..24)
    .tulp-col-{type}-{num}
      width (num / 24) * 100%
  for num in (1..24)
    .tulp-col-offset-{type}-{num}
      margin-left (num / 24) * 100%
medias = {
  'xxl': 1600px,
  'xl': 1200px,
  'lg': 992px,
  'md': 768px,
  'sm': 576px,
}
for key, value in medias
  @media (max-width: value)
    mediaTypes(key)
</style>
