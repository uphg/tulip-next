<template>
  <div style="height: 425px;">
    <tu-button @click="visible = !visible">点我</tu-button>

    <div class="overflow-hidden bg-yellow-200 w-100">
      <tu-collapse-transition>
        <div v-show="visible" style="margin-top: 48px; margin-bottom: 48px; padding-top: 36px; padding-bottom: 36px;" class="bg-blue-300">
          <div class="h-36 bg-light-400">
            <div class="collapse-box">collapse-transition</div>
          </div>
        </div>
      </tu-collapse-transition>
      <div class="bg-green-200 w-100 h-12">下面的内容</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>