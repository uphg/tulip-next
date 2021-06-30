<template>
  <div class="grid-demo">
    <h2>基础示例</h2>
    <div>
      <t-row>
        <t-col :span="24"><div class="grid-block bg-dark" /></t-col>
      </t-row>
      <t-row>
        <t-col :span="12"><div class="grid-block bg-base" /></t-col>
        <t-col :span="12"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row>
        <t-col :span="8"><div class="grid-block bg-base" /></t-col>
        <t-col :span="8"><div class="grid-block bg-light" /></t-col>
        <t-col :span="8"><div class="grid-block bg-base" /></t-col>
      </t-row>
      <t-row>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row>
        <t-col :span="4"><div class="grid-block bg-base" /></t-col>
        <t-col :span="4"><div class="grid-block bg-light" /></t-col>
        <t-col :span="4"><div class="grid-block bg-base" /></t-col>
        <t-col :span="4"><div class="grid-block bg-light" /></t-col>
        <t-col :span="4"><div class="grid-block bg-base" /></t-col>
        <t-col :span="4"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row>
        <t-col :span="2"><div class="grid-block bg-base" /></t-col>
        <t-col :span="2"><div class="grid-block bg-light" /></t-col>
        <t-col :span="2"><div class="grid-block bg-base" /></t-col>
        <t-col :span="2"><div class="grid-block bg-light" /></t-col>
        <t-col :span="2"><div class="grid-block bg-base" /></t-col>
        <t-col :span="2"><div class="grid-block bg-light" /></t-col>
        <t-col :span="2"><div class="grid-block bg-base" /></t-col>
        <t-col :span="2"><div class="grid-block bg-light" /></t-col>
        <t-col :span="2"><div class="grid-block bg-base" /></t-col>
        <t-col :span="2"><div class="grid-block bg-light" /></t-col>
        <t-col :span="2"><div class="grid-block bg-base" /></t-col>
        <t-col :span="2"><div class="grid-block bg-light" /></t-col>
      </t-row>
    </div>
    <h2>添加间隙</h2>
    <div>
      <t-row :gutter="20">
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
    </div>
    <h2>支持 flex justify 属性</h2>
    <div class="grid-justify-demo">
      <t-row>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row justify="start">
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row justify="center">
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row justify="end">
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row justify="space-between">
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
      <t-row justify="space-around">
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
        <t-col :span="6"><div class="grid-block bg-base" /></t-col>
        <t-col :span="6"><div class="grid-block bg-light" /></t-col>
      </t-row>
    </div>
  </div>
</template>
<script>
export default {
  components: {

  }
}
</script>
<style lang="stylus">
.tulp-row
  margin-bottom 20px
.grid-block
  border-radius 4px
  height 35px
.bg-base
  background-color #d1e3fa
.bg-light
  background-color #e8f1fd
.bg-dark
  background-color #a2c6f6
.grid-justify-demo
  .tulp-row
    border-radius 4px
    padding 10px
    background-color #f9fafc
</style>
