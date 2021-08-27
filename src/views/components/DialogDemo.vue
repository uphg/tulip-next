<template>
  <div class="dialog-demo">
    <h2>对话框组件</h2>
    <Button @click="openDialog">点击打开</Button>
    <h2>设置模板</h2>
    <Button @click="clickDialog">点击打开</Button>
    <div>
      <Dialog
        title="都选C"
        v-model:visible="dialogVisible"
      >
        <p>我只想保持本色</p>
        <p>和少年的心气</p>
        <template #footer>
          <Button
            size="small"
            @click="dialogVisible = false"
          >取消</Button>
          <Button
            type="primary"
            size="small"
            @click="dialogVisible = false"
          >确定</Button>
        </template>
      </Dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from '../../lib/Button.vue'
import Dialog from '../../lib/Dialog.vue'
import { useDialog } from '../../lib/useDialog'

export default defineComponent({
  components: { Button, Dialog },
  setup() {
    const dialogVisible = ref(false)
    const dialog = useDialog()
    const openDialog = () => {
      dialog({
        title: '你好',
        content: '我是内容'
      })
    }
    const clickDialog = () => {
      dialogVisible.value = !dialogVisible.value
    }

    return { dialogVisible, openDialog, clickDialog }
  },
})
</script>
<style lang="scss">
p {
  margin: 0;
  line-height: 2.2;
}
</style>
