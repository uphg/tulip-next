<template>
  <tu-space>
    <tu-row class="row-align-item" align="start">
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
    </tu-row>
    <tu-row class="row-align-item" align="end">
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
    </tu-row>
    <tu-row class="row-align-item" align="center">
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
    </tu-row>
    <tu-row class="row-align-item" align="stretch">
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
      <tu-col span="8"><div class="col-block"></div></tu-col>
    </tu-row>
    <div style="position: relative; overflow: hidden;">
      <tu-row class="row-align-item" align="baseline">
        <tu-col span="8"><div class="col-block large">Rise</div></tu-col>
        <tu-col span="8"><div class="col-block small">Rise</div></tu-col>
        <tu-col span="8"><div class="col-block">Rise</div></tu-col>
      </tu-row>
      <div class="horizontal-line"></div>
    </div>
  </tu-space>
</template>

<style scoped>
.col-block {
  height: 48px;
  min-height: 100%;
  background-color: #e5e9f2;
}
.col-block.large {
  font-size: 32px;
}
.col-block.small {
  font-size: 12px;
}
:deep(.tu-col:nth-child(2n)) .col-block {
  background-color: #d3dce6;
}
.row-align-item {
  width: 200px;
  height: 175px;
  background-color: #f9f9f9;
}
.horizontal-line {
  width: 100%;
  height: 0;
  border-bottom: 1px solid #558abb;
  position: absolute;
  top: 24px;
}
</style>