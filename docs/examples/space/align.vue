<template>
  <tu-space>
    <tu-space class="space-align-item" align="start">
      <div class="block">Zero</div>
      <div class="block">Zero</div>
      <div class="block">Zero</div>
    </tu-space>
    <tu-space class="space-align-item" align="end">
      <div class="block">Zero</div>
      <div class="block">Zero</div>
      <div class="block">Zero</div>
    </tu-space>
    <tu-space class="space-align-item" align="center">
      <div class="block">Zero</div>
      <div class="block">Zero</div>
      <div class="block">Zero</div>
    </tu-space>
    <tu-space class="space-align-item" align="stretch">
      <div class="block">Zero</div>
      <div class="block">Zero</div>
      <div class="block">Zero</div>
    </tu-space>
    <div style="position: relative;">
      <tu-space class="space-align-item" align="baseline">
        <div class="block large">Zero</div>
        <div class="block small">Zero</div>
        <div class="block">Zero</div>
      </tu-space>
      <div class="horizontal-line"></div>
    </div>
  </tu-space>
</template>

<style>
.space-align-item {
  height: 175px;
  background-color: #f4f4f8;
  padding: 12px;
}
.demo-space.space__align .block {
  padding: 6px 4px;
  background-color: #fff;
  height: 100%;
  line-height: 1;
}
.demo-space.space__align .block.large {
  font-size: 24px;
}

.demo-space.space__align .block.small {
  font-size: 12px;
}
.demo-space.space__align .horizontal-line {
  width: 100%;
  height: 0;
  border-bottom: 1px solid #558abb;
  position: absolute;
  top: 40px;
}
</style>