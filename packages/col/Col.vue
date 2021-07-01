<template>
  <div
    class="tulp-col"
    :class="classes"
    :style="gutterStyle"
  >
    <slot />
  </div>
</template>
<script>
import { isObject, isNumber } from '../../src/utils/types.js'
const mediaValidator = (value) => isNumber(value) || isObject(value)
/* const mediaValidator = (value) => true {
  if (isNumber(value)) {
    return value >= 0 && value <= 24
  } else if (isObject(value)) {
    const keys = Object.keys(value)
    for (const key of keys) {
      if (!['span', 'offset'].includes(key)) return false
    }
  }
} */

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
    classes() {
      const { span, offset, xs, sm, md, lg, xl, xxl } = this
      let base = {
        [`tulp-col-${span}`]: span,
        [`tulp-col-offset-${offset}`]: offset
      }
      const medias = [
        { key: 'xs', value: xs },
        { key: 'sm', value: sm },
        { key: 'md', value: md },
        { key: 'lg', value: lg },
        { key: 'xl', value: xl },
        { key: 'xxl', value: xxl }
      ]
      medias.forEach(item => {
        if (item.value) {
          if (isObject(item.value)) {
            const { span, offset } = item.value
            base = {
              ...base,
              [`tulp-col-${item.key}-${span}`]: span,
              [`tulp-col-offset-${item.key}-${offset}`]: offset
            }
          } else {
            base = {
              ...base,
              [`tulp-col-${item.key}-${item.value}`]: item.value
            }
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
