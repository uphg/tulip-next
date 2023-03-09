<template>
  <div style="height: 425px;">
    <tu-button @click="visible = !visible">点我</tu-button>

    <div style="overflow: hidden; width: 100; background-color: #e7e5db;">
      <tu-collapse-transition>
        <div v-show="visible" class="collapse-transition-demo">
          <div>
            <div class="collapse-box">collapse-transition</div>
          </div>
        </div>
      </tu-collapse-transition>
      <div style="height: 100px; background-color: #f1f0e9;">下面的内容</div>
    </div>

    <h2>宽度过渡</h2>
    <tu-button @click="visible2 = !visible2">点我</tu-button>
    <div>
      <tu-expand-transition withWidth>
        <div v-show="visible2" class="collapse-box2">collapse-transition</div>
      </tu-expand-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)
</script>

<style>
.collapse-transition-demo {
  height: 200px;
  margin-top: 48px;
  margin-bottom: 48px; 
  background-color: #42a5f5;
}
.collapse-box {
  background-color: #fbc02d;
}

.collapse-box2 {
  width: 200px;
  height: 100px;
  background-color: #35495e;
}
</style>