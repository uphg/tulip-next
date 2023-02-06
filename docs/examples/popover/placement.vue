<template>
  <div class="popover-placement-demo">
    <div class="placement-top">
      <tu-popover placement="top-start" trigger="click">
        <template #trigger><tu-button>Top Start</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover trigger="click">
        <template #trigger><tu-button>Top</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover placement="top-end" trigger="click">
        <template #trigger><tu-button>Top End</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
    </div>
    <div class="placement-left">
      <tu-popover placement="left-start" trigger="click">
        <template #trigger><tu-button>Left Start</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover placement="left" trigger="click">
        <template #trigger><tu-button>Left</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover placement="left-end" trigger="click">
        <template #trigger><tu-button>Left End</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
    </div>
    <div class="placement-right">
      <tu-popover placement="right-start" trigger="click">
        <template #trigger><tu-button>Right Start</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover placement="right" trigger="click">
        <template #trigger><tu-button>Right</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover placement="right-end" trigger="click">
        <template #trigger><tu-button>Right End</tu-button></template>
        <div class="text">哦</div>
        
      </tu-popover>
    </div>
    <div class="placement-bottom">
      <tu-popover placement="bottom-start" trigger="click">
        <template #trigger><tu-button>Bottom Start</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover placement="bottom" trigger="click">
        <template #trigger><tu-button>Bottom</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
      <tu-popover placement="bottom-end" trigger="click">
        <template #trigger><tu-button>Bottom End</tu-button></template>
        <div class="text">哦</div>
      </tu-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
const content = '死亡不是失去了生命\n而是走出了时间'
</script>

<style lang="stylus">
$row-gap = 16px
$column-gap = 16px

.popover__placement {
  .tu-button {
    width: 100px;
  }

  .popover-placement-demo {
    width: 532px;
    display: flex;
    flex-wrap: wrap;
  }
  .placement-top {
    width: 432px;
    margin-left: 100px;
    display: flex;
    gap: $row-gap;
  }
  .placement-left {
    padding-top: $column-gap;
    display: flex;
    flex-direction: column;
    gap: $column-gap;
  }
  .placement-right {
    padding-top: $column-gap;
    display: flex;
    flex-direction: column;
    gap: $column-gap;
    margin-left: 332px;
  }
  .placement-bottom {
    padding-top: $column-gap;
    display: flex;
    margin-left: 100px;
    gap: $row-gap;
  }
}

.tu-popover {
  .text {
    width: 96px;
    height: 96px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-size: 82px;
  }
}
</style>