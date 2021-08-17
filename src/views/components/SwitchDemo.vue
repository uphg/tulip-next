<template>
  <div class="switch-demo">
    <h2>Switch 组件</h2>
    <p>表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>
    <h3>基本用法</h3>
    <Switch v-model:value="value" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import Switch from '../../lib/Switch.vue'
export default defineComponent({
  components: { Switch },
  setup () {
    const value = ref(false)
    return { value }
  }
})
</script>