<template>
  <template v-if="visible">
    <Teleport to="body">
      <div
        class="tulp-dialog"
        v-bind="$attrs"
      >
        <div class="tulp-dialog-overlay" @click="closeDialog"></div>
        <div class="tulp-dialog-wrapper">
          <div class="tulp-dialog-content">
            <div class="tulp-dialog-header">
              <span class="tulp-dialog-title">标题</span>
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
    </Teleport>
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { LIB_PREFIX } from '../utils/default-config'
export default defineComponent({
  name: `${LIB_PREFIX}Dialog`,
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
.tulp-dialog {
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
  background-color: rgba(0,0,0,.45);
}
.tulp-dialog-wrapper {
  // z-index: 1;
  width: 446px;
  position: relative;
  
  margin: {
    top: 50%;
    left: auto;
    right: auto;
  };
  transform: translateY(-100%);
  background-color: #fff;
}
.tulp-dialog-content {
  
  box-shadow: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
}
.tulp-dialog-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
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
.tulp-dialog-body {
  padding: 24px;
}
.tulp-dialog-footer {
  padding: 10px 16px;
  border-top: 1px solid #e8e8e8;
  border-radius: 0 0 4px 4px;
  text-align: right;
  .tulp-button:not(:last-child) {
    margin-right: 10px;
  }
}
</style>