<template>
  <Teleport to="body" :disabled="wrap">
    <transition
      name="dialog-fade"
      @after-leave="handleAfterLeave"
    >
      <div
        v-if="visible"
        class="tulp-dialog-container"
        v-bind="$attrs"
      >
        <div class="tulp-dialog-overlay" @click="closeDialog"></div>
        <div class="tulp-dialog">
          <div class="tulp-dialog-content">
            <div class="tulp-dialog-header">
              <span class="tulp-dialog-title">{{ title }}</span>
              <span class="tulp-dialog-close" @click="closeDialog"></span>
            </div>
            <div class="tulp-dialog-body">
              <slot />
            </div>
            <div class="tulp-dialog-footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Lib } from '../utils/default-config'
export default defineComponent({
  name: `${Lib.Prefix}Dialog`,
  emits: ['update:visible', 'close'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String,
    wrap: Boolean
  },
  setup(props, context) {
    const closeDialog = () => {
      context.emit('update:visible', false)
    }

    const handleAfterLeave = () => {
      context.emit('close', false)
    }

    return { closeDialog, handleAfterLeave }
  }
})
</script>
<style lang="scss">
@import 'style/common/variable.scss';

.tulp-dialog-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.tulp-dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .45);
  transition: background-color 0.25s;
}
.tulp-dialog {
  width: 446px;
  position: relative;
  margin: {
    top: 30vh;
    left: auto;
    right: auto;
  };
}
.tulp-dialog-content {
  background-color: #fff;
  border-radius: $_dialog-border-radius;
  box-shadow: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
}
.tulp-dialog-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
  border-radius: $_dialog-border-radius $_dialog-border-radius 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tulp-dialog-close {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 1px;
    background-color: #000000;
    width: 100%;
    top: 50%;
    left: 50%;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
.tulp-dialog-body {
  padding: 24px;
}
.tulp-dialog-footer {
  padding: 10px 16px;
  border-top: 1px solid #e8e8e8;
  border-radius: 0 0 $_dialog-border-radius $_dialog-border-radius;
  text-align: right;
  .tulp-button:not(:last-child) {
    margin-right: 10px;
  }
}

.dialog-fade-enter-active {
  animation: dialog-overlay-fade-in 0.3s;
  .tulp-dialog {
    animation: dialog-fade-in 0.3s;
  }
}

.dialog-fade-leave-active {
  animation: dialog-overlay-fade-out 0.3s;
  .tulp-dialog {
    animation: dialog-fade-out 0.3s;
  }
}

@keyframes dialog-overlay-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    /*transform: translate3d(0, 0, 0);*/
    opacity: 1;
  }
}

@keyframes dialog-overlay-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


@keyframes dialog-fade-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
