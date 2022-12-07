<template>
  <tu-row>
    <tu-col span="18" push="6"><div class="block bg-blue">push</div></tu-col>
    <tu-col span="6" pull="18"><div class="block bg-red">pull</div></tu-col>
  </tu-row>  
</template>

<style scoped>
.block {
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #fff;
  background-color: #e5e9f2;
}
.bg-blue {
  background-color: #3b82f6;
}
.bg-red {
  background-color: #ef4444;
}
</style>