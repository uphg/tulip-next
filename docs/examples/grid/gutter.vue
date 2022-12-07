<template>
  <tu-row :gutter="[8, 16]">
    <tu-col span="6"><div class="col-block"></div></tu-col>
    <tu-col span="6"><div class="col-block"></div></tu-col>
    <tu-col span="6"><div class="col-block"></div></tu-col>
    <tu-col span="6"><div class="col-block"></div></tu-col>
    <tu-col span="6"><div class="col-block"></div></tu-col>
    <tu-col span="6"><div class="col-block"></div></tu-col>
    <tu-col span="6"><div class="col-block"></div></tu-col>
    <tu-col span="6"><div class="col-block"></div></tu-col>
  </tu-row>
</template>

<style scoped>
.col-block {
  height: 48px;
  background-color: #e5e9f2;
}
:deep(.tu-col:nth-child(2n)) .col-block {
  background-color: #d3dce6;
}
</style>