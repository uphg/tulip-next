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
@import 'style/components/dialog';
</style>
