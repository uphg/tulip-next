<template>
  <div class="button-demo">
    <h2>Button 组件示例</h2>
    <Button @click="onClick">默认按钮</Button>
    <Button type="primary" @click="onClick">主要按钮</Button>
    <Button type="primary" size="small" @click="onClick">迷你按钮</Button>
  </div>
</template>
<script lang="ts">
import Button from '../../lib/Button.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  components: { Button },
  setup() {
    const onClick = () => {
      console.log('hi')
    }
    return { onClick }
  }
})
</script>
<style lang="scss">
.button-demo {
  .tulp-button {
    margin-right: 10px;
  }
}
</style>
