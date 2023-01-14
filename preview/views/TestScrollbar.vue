<template>
  <tu-scrollbar class="demo-scrollbar">
    <p v-for="item in 80" :key="item">Hi, Jack {{ item }}</p>
  </tu-scrollbar>
</template>

<style lang="stylus">
.demo-scrollbar {
  width: 800px;
  height: 800px;
  border: 1px solid #0078d7;
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track-piece,
  &::-webkit-scrollbar-thumb {
    width: 0;
    height: 0;
    display: none;
  }
}
</style>