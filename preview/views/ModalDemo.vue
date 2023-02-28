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
    <div style="position: absolute; top: 50%; left: 620px; transform: translate(-50%, -50%);">
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
    <tu-modal ref="modalRef" v-model:visible="visible2">
      <div style="padding: 12px 16px;">
        <tu-button @click="clickModalButton">点我查看当前元素</tu-button>
      </div>
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

const modalRef = ref<{ modal: HTMLElement } | null>(null)
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

function clickModalButton() {
  console.log('modalRef.value')
  const modal = modalRef.value?.modal as HTMLElement
  console.log(modal.getBoundingClientRect())
}

</script>

<style>
.modal-button {
  padding: 32px;
}
</style>