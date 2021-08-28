<template>
  <div class="home-content">
    <h1 class="home-title">
      Tulip
    </h1>
    <div class="description">
      <p>一个 Vue 3 组件库</p>
      <p>...</p>
    </div>
    <div class="home-operations">
      <Button type="primary">开始使用</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../lib/Button.vue';

export default defineComponent({
  components: { Button }
})
</script>
<style lang="scss">
.home-content {
  text-align: center;
  margin-top: -16vh;
  .home-title{
    font-size: 100px;
    text-shadow: 3px 3px 0 #ff6666;
    margin: 0 0 20px;
    transition: font-size 0.25s;
  }
  .description {
    color: #476582;
    margin-bottom: 20px;
  }
  @media (max-width: 719px) {
    .home-title {
      font-size: 60px;
      text-shadow: 2px 2px 0 #ff6666;
    }
  }
}

</style>
