<template>
  <tu-scrollbar class="demo-scrollbar" direction-x>
    <p v-for="item in 50" :key="item">Hi, Jack {{ item }}</p>
    <p style="width: 1000px;">
      <span v-for="item in 100" :key="item + 'a'">Hi, Jack {{ item }}</span>
    </p>
  </tu-scrollbar>
</template>

<style lang="stylus">
.demo-scrollbar {
  width: 800px;
  height: 800px;
  border: 1px solid #0078d7;
}
</style>