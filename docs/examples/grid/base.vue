<template>
  <tu-space :item-style="{ width: '100%' }">
    <tu-row>
      <tu-col span="24"><div class="col-block"></div></tu-col>
    </tu-row>
    <tu-row>
      <tu-col span="12"><div class="col-block"></div></tu-col>
      <tu-col span="12"><div class="col-block"></div></tu-col>
    </tu-row>
    <tu-row>
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
    </tu-row>
    <tu-row>
      <tu-col span="6"><div class="col-block"></div></tu-col>
      <tu-col span="6"><div class="col-block"></div></tu-col>
      <tu-col span="6"><div class="col-block"></div></tu-col>
      <tu-col span="6"><div class="col-block"></div></tu-col>
    </tu-row>
  </tu-space>
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