<template>
  <div class="tulp-dialog-overlay"></div>
  <div class="tulp-dialog-wrapper">
    <div class="tulp-dialog-content">
      <div class="tulp-dialog-header">
        <span>标题</span>
      </div>
      <div class="tulp-dialog-body">
        <slot />
      </div>
      <div class="tulp-dialog-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, nextTick  } from 'vue'
import { LIB_PREFIX } from '../utils/default-config'
export default defineComponent({
  name: `${LIB_PREFIX}Dialog`,
})
</script>
<style lang="scss">
.tulp-dialog-overlay {
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // // z-index: 1;
  // background-color: rgba(0,0,0,.45);
}
.tulp-dialog-wrapper {
  // z-index: 1;
}
.tulp-dialog-content {
  width: 446px;
  box-shadow: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
}
.tulp-dialog-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
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