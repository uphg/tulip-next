<template>
  <button
    class="tulp-switch"
    :class="{ 'tulp-switch--checked': value }"
    @click="toggle"
  >
    <span
      v-if="isWave"
      class="tulp-switch-wave"
      :class="{ active: isWave }"
    />
    <span class="tulp-switch-core"></span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useButtonWave } from "./useButtonWave"

export default defineComponent({
  props: {
    value: Boolean
  },
  setup (props, context) {
    const { isWave, triggerWave } = useButtonWave()
    const toggle = () => {
      triggerWave()
      context.emit('update:value', !props.value)
    }

    return { toggle, isWave }
  }
})
</script>
<style lang="scss">
@use "sass:math";
@import 'style/common/variable.scss';
@import 'style/button-wave', 'style/animation-wave';

$height: 20px;
$core-height: $height - 4px;
.tulp-switch {
  cursor: pointer;
  width: $height*2;
  height: $height;
  border: none;
  // 语法参考: https://sass-lang.com/documentation/breaking-changes/slash-div
  border-radius: math.div($height, 2);
  background-color: rgba(0, 0, 0, 0.14);
  transition: background-color 0.25s;
  transition: $_background-transition, $_box-shadow-transition;
  position: relative;
  --ripple-color: #415fcc;
  &:focus {
    outline: none;
    box-shadow: $_wave-box-shadow;
  }
  &:hover {
    box-shadow: none;
  }
  &:active {
    > .tulp-switch-core {
      width: $core-height + 4px;
    }
  }
  &.tulp-switch--checked {
    background-color: #415fcc;
    & > .tulp-switch-core {
      left: calc(100% - #{$core-height} - 2px);
    }
    &:focus {
      box-shadow: $_wave-active-box-shadow;
    }
    &:hover {
      box-shadow: none;
    }
    &:active > .tulp-switch-core {
      width: $core-height + 4px; margin-left: -4px;
    }
  }
}
.tulp-switch-core {
  width: $core-height;
  height: $core-height;
  border-radius: math.div($core-height, 2);
  background-color: #fff;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.25s, margin-left 0.25s, width 0.25s;
}

.tulp-switch-wave {
  @include button-wave;
}
</style>