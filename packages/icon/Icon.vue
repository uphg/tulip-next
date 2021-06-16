
<template>
  <svg :class="{ [`tulp-icon-${name}`]: name }" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
import '../../styles/icon.styl'
import '../../src/icon/tulip-icon.js'
export default {
  name: 'TIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
<!--<style lang="scss" src="../../styles/icon.scss"></style>-->
