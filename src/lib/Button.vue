<template>
  <button class="tulp-button">
    <span class="tulp-button__content">
      <slot />
    </span>
    <span class="tulp-button__border"></span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TButton'
})
</script>
<style lang="scss">
.tulp-button {
  position: relative;
  font-size: 14px;
  background-color: #ffffff;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: color 0.25s;
  position: relative;
  padding: 0 16px;
  height: 36px;
  line-height: 1;
  &:hover, &:focus {
    color: #415fcc;
    .tulp-button__border {
      border-color: #415fcc;
    }
  }
  &__content {

  }
  &__border {
    transition: border-color 0.25s;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
