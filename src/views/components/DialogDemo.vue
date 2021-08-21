<template>
  <div class="dialog-demo">
    <h2>对话框组件</h2>
    <Dialog>
      <p>我只想保持本色</p>
      <p>和少年的心气</p>
      <template #footer>
        <Button>取消</Button>
        <Button type="primary">确定</Button>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../../lib/Button.vue'
import Dialog from '../../lib/Dialog.vue'
export default defineComponent({
  components: { Button, Dialog },
  setup() {
    
  },
})
</script>
<style lang="scss">
p {
  margin: 0;
  line-height: 2.2;
}
</style>
