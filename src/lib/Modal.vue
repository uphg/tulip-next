<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="visible"
        class="tulp-modal"
        v-bind="$attrs"
      >
        <div class="tulp-modal-overlay" @click="closeDialog"></div>
        <div class="tulp-modal-wrapper">
          <div class="tulp-modal-content">
            <div class="tulp-modal-header">
              <span class="tulp-modal-title">标题</span>
              <span class="tulp-modal-close" @click="closeDialog"></span>
            </div>
            <div class="tulp-modal-body">
              <slot />
            </div>
            <div class="tulp-modal-footer">
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
  name: `${Lib.Prefix}Modal`,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const closeDialog = () => {
      context.emit('update:visible', false)
    }

    return { closeDialog }
  }
})
</script>
<style lang="scss">
@import 'style/common/variable.scss';

.tulp-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.tulp-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .45);
  transition: background-color 0.25s;
}
.tulp-modal-wrapper {
  width: 446px;
  position: relative;
  margin: {
    top: 30vh;
    left: auto;
    right: auto;
  };
}
.tulp-modal-content {
  background-color: #fff;
  border-radius: $_dialog-border-radius;
  box-shadow: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
}
.tulp-modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
  border-radius: $_dialog-border-radius $_dialog-border-radius 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tulp-modal-close {
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
    background: black;
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
.tulp-modal-body {
  padding: 24px;
}
.tulp-modal-footer {
  padding: 10px 16px;
  border-top: 1px solid #e8e8e8;
  border-radius: 0 0 $_dialog-border-radius $_dialog-border-radius;
  text-align: right;
  .tulp-button:not(:last-child) {
    margin-right: 10px;
  }
}

.modal-fade-enter-active {
  animation: modal-overlay-fade-in 0.3s;
  .tulp-modal-wrapper {
    animation: modal-fade-in 0.3s;
  }
}

.modal-fade-leave-active {
  animation: modal-overlay-fade-out 0.3s;
  .tulp-modal-wrapper {
    animation: modal-fade-out 0.3s;
  }
}

@keyframes modal-overlay-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes modal-overlay-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


@keyframes modal-fade-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes modal-fade-out {
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
