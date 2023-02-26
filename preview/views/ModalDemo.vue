<template>
  <div class="modal-button">
    <tu-button @click="visible = !visible">点我打开</tu-button>
    <div class="modal-button">
      <tu-button @click="visible2 = !visible2">点我打开</tu-button>
      <div class="modal-button">
        <tu-button @click="visible3 = !visible3">点我打开</tu-button>
      </div>
    </div>
    <div style="position: absolute; bottom: 20px; left: 20px;">
      <tu-button @click="visible = true">点我打开</tu-button>
    </div>
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <tu-button @click="visible = true">点我打开</tu-button>
    </div>
    <tu-modal v-model:visible="visible">
      <tu-dialog
        title="模态框"
        content="内容"
        status=""
        :onClose="onClose"
        :onConfirm="onConfirm"
        :onCancel="onCancel"
      />
    </tu-modal>
    <tu-modal v-model:visible="visible2">
      <tu-dialog
        title="模态框"
        content="内容"
        status=""
        :onClose="onClose2"
        :onConfirm="onConfirm2"
        :onCancel="onCancel2"
      />
    </tu-modal>
    <tu-modal v-model:visible="visible3">
      <tu-dialog
        title="模态框"
        content="内容"
        status=""
        :onClose="onClose3"
        :onConfirm="onConfirm3"
        :onCancel="onCancel3"
      />
    </tu-modal>
  </div>
  <p v-for="item in 100" :key="item">{{ item }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
const visible2 = ref(false)
const visible3 = ref(false)
function onClose() {
  visible.value = false
}

function onConfirm() {
  visible.value = false
}

function onCancel() {
  visible.value = false
}

function onClose2() {
  visible2.value = false
}

function onConfirm2() {
  visible2.value = false
}

function onCancel2() {
  visible2.value = false
}

function onClose3() {
  visible3.value = false
}

function onConfirm3() {
  visible3.value = false
}

function onCancel3() {
  visible3.value = false
}

</script>

<style>
.modal-button {
  padding: 32px;
}
</style>