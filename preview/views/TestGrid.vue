<template>
  <div style="padding: 100px 200px">
    <div style="height: 20px; background-color: #90a4ae;"></div>
    <div class="demo1">
      <tu-row :gutter="[24, 6]" >
        <tu-col :span="8"><div class="block">1</div></tu-col>
        <tu-col :span="8"><div class="block">2</div></tu-col>
        <tu-col :span="8"><div class="block">3</div></tu-col>
        <tu-col :span="8"><div class="block">3</div></tu-col>
        <tu-col :span="8"><div class="block">3</div></tu-col>
        <tu-col :span="8"><div class="block">3</div></tu-col>
      </tu-row>
    </div>
    <div style="height: 20px; background-color: #90a4ae;"></div>
    <div class="demo2">
      <tu-row>
        <tu-col :span="8" push="8"><div class="block bg-blue-500">push</div></tu-col>
        <tu-col :span="8" pull="8"><div class="block bg-red-500">pull</div></tu-col>
        <tu-col :span="8"><div class="block">3</div></tu-col>
      </tu-row>
      <tu-row>
        <tu-col span="8" offset="8"><div class="block bg-blue-500">offset</div></tu-col>
        <tu-col :span="8"><div class="block">3</div></tu-col>
      </tu-row>
    </div>
    <div class="demo3">
      <tu-row>
        <tu-col :span="8"><div class="block">1</div></tu-col>
        <tu-col :span="8"><div class="block">2</div></tu-col>
        <tu-col :span="8"><div class="block">3</div></tu-col>
      </tu-row>
    </div>
  </div>
</template>

<style>
.block {
  color: #fff;
  height: 100px;
  background-color: #0277bd;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.bg-red-500 {
  background-color: #ef4444;
}
.demo1 {
  /* background-color: #4eac52; */
}
</style>