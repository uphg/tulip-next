<template>
  <div class="tulp-button-group">
    <slot />
  </div>
</template>
<script>
import '../../styles/button-group.styl'
export default {
  name: 'TButtonGroup',
  mounted() {
    if (this.$el.children.length < 1) {
      console.error('Tulip: t-button must exist in t-button-group!')
    }
    for (const el of this.$el.children) {
      const name = el.nodeName.toLowerCase()
      if (name !== 'button') console.warn(`Tulip: The child element of t-button-group should be t-button, not ${name}.`)
    }
  }
}
</script>
