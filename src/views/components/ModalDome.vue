<template>
  <div class="modal-demo">
    <h2>模态框组件</h2>
    <Button @click="modalVisible = true">点击打开</Button>
    <Modal v-model:visible="modalVisible">
      <p>我只想保持本色</p>
      <p>和少年的心气</p>
      <template #footer>
        <Button
          size="small"
          @click="modalVisible = false"
        >取消</Button>
        <Button
          type="primary"
          size="small"
          @click="modalVisible = false"
        >确定</Button>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from '../../lib/Button.vue'
import Modal from '../../lib/Modal.vue';

export default defineComponent({
  components: { Button, Modal },
  setup() {
    const modalVisible = ref(false)

    return { modalVisible }
  },
})
</script>
<style lang="scss">
p {
  margin: 0;
  line-height: 2.2;
}
</style>
