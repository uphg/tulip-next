<template>
  <div class="input-demo">
    <h2>input 组件示例</h2>
    <Input v-model:value="value"></Input>
    <p>{{ value }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Input from '../../lib/Input.vue'

export default defineComponent({
  components: { Input },
  setup() {
    const value = ref(null)
    
    return { value }
  },
})
</script>
