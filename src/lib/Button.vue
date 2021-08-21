<template>
  <button class="tulp-button" @mouseup="onMouseup">
    <span class="tulp-button__content">
      <slot />
    </span>
    <span class="tulp-button__border"></span>
    <span
      v-if="isWave && !text"
      class="tulp-base__wave"
      :class="{ active: isWave }"
    />
  </button>
</template>
<script lang="ts">
import { TULP } from '../utils/default-config'
import { defineComponent, PropType, ref, Ref, nextTick  } from 'vue';

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
  name: `${TULP}Button`,
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
    const isWave = ref(false)
    let animationTimerId: number | null = null

    const onMouseup = () => {
      if (isWave) {
        animationTimerId && window.clearTimeout(animationTimerId)
        isWave.value = false
        animationTimerId = null
      }
      nextTick(() => {
        isWave.value = true
        animationTimerId = window.setTimeout(() => {
          isWave.value = false
          animationTimerId = null
        }, 1000)
      })
    }

    return { isWave, onMouseup }
  }
})
</script>
<style lang="scss">
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
  &:hover, &:focus {
    color: #415fcc;
    .tulp-button__border {
      border-color: #415fcc;
    }
  }
  &__border {
    transition: border-color 0.25s;
    box-sizing: border-box;
    width: 100%;
    border-radius: inherit;
    border: 1px solid #dcdfe6;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.tulp-base__wave {
  pointer-events: none;
  box-sizing: border-box;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  z-index: 1;
  animation-iteration-count: 1;  // 动画执行次数
  animation-duration: .6s;  // 动画持续时间
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);  // 动画过渡效果
  &.active {
    animation-name: button-wave-spread, button-wave-opacity;
  }
}

@keyframes button-wave-spread {
  from {
    box-shadow: 0 0 0.5px 0 var(--ripple-color);
  }
    
  to {
    box-shadow: 0 0 0.5px 4.5px var(--ripple-color);
  }
}

@keyframes button-wave-opacity {
  from {
    opacity: 0.6;
  }
    
  to {
    opacity: 0;
  }
}
</style>
