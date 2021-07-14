<template>
  <div class="layout-demo">
    <div class="row">
      <t-layout>
        <t-header>头部</t-header>
        <t-main>内容</t-main>
        <t-footer>底部</t-footer>
      </t-layout>
    </div>
    <div class="row">
      <t-layout>
        <t-aside>侧栏</t-aside>
        <t-main>内容</t-main>
      </t-layout>
    </div>
    <div class="row">
      <t-layout>
        <t-aside width="200px">侧栏</t-aside>
        <t-main>内容</t-main>
      </t-layout>
    </div>
  </div>
</template>
<style lang="stylus">

.tulp-header, .tulp-footer, .tulp-main, .tulp-aside
  text-align center

.tulp-header, .tulp-footer
  background-color #a2c6f6
  line-height 60px
.tulp-main
  background-color #e8f1fd
  line-height 200px
.tulp-aside
  background-color #d1e3fa
  line-height: 200px;

</style>
