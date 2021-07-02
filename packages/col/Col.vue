<template>
  <div
    class="tulp-col"
    :class="[
      {
        [`tulp-col-${span}`]: span,
        [`tulp-col-offset-${offset}`]: offset
      },
      mediaClass('sm', sm),
      mediaClass('md', md),
      mediaClass('lg', lg),
      mediaClass('xl', xl),
      mediaClass('xxl', xxl),
    ]"
    :style="gutterStyle"
  >
    <slot />
  </div>
</template>
<script>
import { isNumber, isObject } from '../../src/utils/types.js'
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
      const { gutter } = this
      if (!gutter) return
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`
      }
    }
  },
  methods: {
    mediaClass(type, item) {
      if (isNumber(item)) {
        return {
          [`tulp-col-${type}-${item}`]: item
        }
      } else if (isObject(item)) {
        return {
          [`tulp-col-${type}-${item.span}`]: item.span,
          [`tulp-col-offset-${type}-${item.offset}`]: item.offset
        }
      } else {
        return null
      }
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
