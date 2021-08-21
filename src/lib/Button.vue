<template>
  <button
    class="tulp-button"
    :class="{
      [`tulp-button-${type}`]: type
    }"
    @mouseup="triggerWave"
  >
    <span class="tulp-button-content">
      <slot />
    </span>
    <span class="tulp-button-border"></span>
    <span
      v-if="isWave && !text"
      class="tulp-button-wave"
      :class="{ active: isWave }"
    />
  </button>
</template>
<script lang="ts">
import { LIB_PREFIX } from '../utils/default-config'
import { defineComponent, PropType } from 'vue';
import { useButtonWave } from './useButtonWave'

type TButtonType = PropType<'primary' | 'success' | 'warning' | 'danger'>
type TButtonNativeType = PropType<'button' | 'submit' | 'reset'>

interface TButtonProps {
  type: TButtonType
  size: PropType<ComponentSize>,
  icon: string,
  nativeType: string,
  loading: boolean,
  disabled: boolean,
  text: boolean
}

export default defineComponent({
  name: `${LIB_PREFIX}Button`,
  props: {
    type: {
      type: String as TButtonType,
      default: 'default',
      validator: (value: string) => {
        return [
          'default',
          'primary',
          'success',
          'warning'
        ].includes(value)
      }
    },
    icon: String,
    nativeType: {
      type: String as TButtonNativeType,
      default: 'button',
      validator: (value: string) => {
        return ['button', 'submit', 'reset'].includes(value)
      },
    },
    loading: Boolean,
    disabled: Boolean,
    text: Boolean
  },
  setup() {
    const { isWave, triggerWave } = useButtonWave()

    return { isWave, triggerWave }
  }
})
</script>
<style lang="scss">
@import 'style/button-wave', 'style/animation-wave';
$_color-primary: #415fcc;
$_color-primary-light: #7288d9;
$_color-primary-dark: #2b45a1;

.tulp-button {
  position: relative;
  font-size: 14px;
  background-color: #ffffff;
  border: none;
  border-radius: 3px;
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
  --ripple-color: #415fcc;
  &-border {
    transition: border-color 0.25s;
    box-sizing: border-box;
    width: 100%;
    border-radius: inherit;
    
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
.tulp-button-default {
  .tulp-button-border {
    border: 1px solid #dcdfe6;
  }
  &:hover, &:focus {
    color: #415fcc;
    .tulp-button-border {
      border-color: #415fcc;
    }
  }
  &:active {
    color: $_color-primary-dark;
    .tulp-button-border {
      border-color: $_color-primary-dark;
    }
  }
}

.tulp-button-primary {
  color: #ffffff;
  background-color: $_color-primary;
  transition: background-color 0.25s;
  .tulp-button-border {
    border: none;
  }
  &:hover, &:focus {
    background-color: $_color-primary-light;
  }
  &:active {
    background-color: $_color-primary-dark;
  }
}

.tulp-button-wave {
  @include button-wave;
}
</style>
