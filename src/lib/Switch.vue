<template>
  <button class="switch" :class="{ checked: value }" @click="toggle">
    <span class="switch-core"></span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    value: Boolean
  },
  setup (props, context) {
    const toggle = () => {
      context.emit('update:value', !props.value)
    }
    return { toggle }
  }
})
</script>
<style lang="scss" scoped>
@use "sass:math";

$height: 20px;
$core-height: $height - 4px;
.switch {
  cursor: pointer;
  width: $height*2;
  height: $height;
  border: none;
  // 语法参考: https://sass-lang.com/documentation/breaking-changes/slash-div
  border-radius: math.div($height, 2);
  background-color: #dcdfe6;
  transition: background-color 0.25s;
  position: relative;
  &:focus {
    outline: none;
  }
  &:active {
    > .switch-core {
      width: $core-height + 4px;
    }
  }
  &.checked {
    background-color: #1890ff;
    & > .switch-core {
      left: calc(100% - #{$core-height} - 2px);
    }
    &:active > .switch-core {
      width: $core-height + 4px; margin-left: -4px;
    }
  }
}
.switch-core {
  width: $core-height;
  height: $core-height;
  border-radius: math.div($core-height, 2);
  background-color: #fff;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.25s, margin-left 0.25s, width 0.25s;
}
</style>