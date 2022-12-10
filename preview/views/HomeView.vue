<template>
  <main>
    <div style="padding: 20px">
      <!-- <Test /> -->
      <!-- <TestCollapseTransition /> -->
      <!-- <TestTabs /> -->
      <!-- <TestPagination /> -->
      <!-- <TestPopover /> -->
      <!-- <TestPopoverScroll /> -->
      <!-- <TestGrid /> -->
      <TestEllipsis />
    </div>
  </main>
</template>

<script setup lang="ts">
// import Test from './Test.vue'
// import TestCollapseTransition from './TestCollapseTransition.vue'
// import TestTabs from './TestTabs.vue'
// import TestPagination from './TestPagination.vue'
import TestPopover from './TestPopover.vue'
// import TestPopoverScroll from './TestPopoverScroll.vue'
// import TestGrid from './TestGrid.vue'
import TestEllipsis from './TestEllipsis.vue'
</script>

<style lang="stylus">

box-border()
  box-sizing border-box

r(n)
  return n * 0.25rem

inset(n)
  top r(n)
  right r(n)
  bottom r(n)
  left r(n)

p(n)
  padding r(n)

py(n)
  padding-top r(n) 
  padding-bottom r(n)

px(n)
  padding-left r(n)
  padding-right r(n)

pt(n)
  padding-top r(n)

.demo
  inset(1)
  p(2)
  width 200px
  height 100px
  border 1px

</style>