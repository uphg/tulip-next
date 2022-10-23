<template>
  <div class="tu-pagination">
    <button
      :disabled="current <= 1"
      @click="handlePrev"
    >上一页</button>
    <button
      v-for="item in totalPages"
      :key="getNodeKey(item)"
      :class="{ active: item === current }"
      @click="handleCurrent(item)"
    >{{ item }}</button>
    <button
      :disabled="current >= totalPages"
      @click="handleNext"
    >下一页</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const getNodeKey = (value: number) => Symbol(value)

const props = defineProps({
  current: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['update:current'])

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const handleCurrent = (value: number) => {
  emit('update:current', value)
}

const handlePrev = () => {
  const prev = props.current - 1
  if (prev >= 1) {
    emit('update:current', props.current - 1)
  }
}

const handleNext = () => {
  const next = props.current + 1
  if (next <= totalPages.value) {
    emit('update:current', props.current + 1)
  }
}
</script>

<style>
.active {
  border-color: royalblue;
}
</style>