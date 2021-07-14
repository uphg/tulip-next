<template>
  <div class="scrollbar-demo">
    <div class="scrollbar-row">
      <t-scrollbar height="100px">
        <p v-for="item in 20" :key="item">内容{{ item }}</p>
      </t-scrollbar>
    </div>
    <!-- <div class="scrollbar-row">
      <t-scrollbar height="200px" tag="section" wrap-class="wrap" view-class="view">
        <p v-for="item in 20" :key="item">内容{{ item }}</p>
      </t-scrollbar>
    </div> -->
  </div>
</template>
<style lang="stylus">
.scrollbar-row
  border 1px solid #ccc
  margin 10px 0

</style>
