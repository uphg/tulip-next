<template>
  <div>
    <tu-input v-model:value="value" placeholder="请输入内容">
      <template #prefix>
        ￥
      </template>
    </tu-input>
    <p>{{ value }}</p>
  </div>
  <div>
    <h2>按钮组</h2>
    <div class="button-group-row">
      <tu-button-group>
        <tu-button>上一页</tu-button>
        <tu-button>第1页</tu-button>
        <tu-button>第2页</tu-button>
        <tu-button>第3页</tu-button>
        <tu-button>下一页</tu-button>
      </tu-button-group>
    </div>
    <div class="button-group-row">
      <tu-button-group>
        <tu-button round>上一页</tu-button>
        <tu-button round>第1页</tu-button>
        <tu-button round>第2页</tu-button>
        <tu-button round>第3页</tu-button>
        <tu-button round>下一页</tu-button>
      </tu-button-group>
    </div>
    <div class="button-group-row">
      <tu-button-group vertical>
        <tu-button round>上一页</tu-button>
        <tu-button round>第1页</tu-button>
        <tu-button round>第2页</tu-button>
        <tu-button round>第3页</tu-button>
        <tu-button round>下一页</tu-button>
      </tu-button-group>
    </div>
    <div class="button-group-row">
      <tu-button-group>
        <tu-button class="primary">上一页</tu-button>
        <tu-button class="primary">第1页</tu-button>
        <tu-button class="primary">第2页</tu-button>
        <tu-button class="primary">第3页</tu-button>
        <tu-button class="primary">下一页</tu-button>
      </tu-button-group>
    </div>
    <div class="button-group-row">
      <tu-button-group>
        <tu-button round>上一页</tu-button>
        <tu-button round>第1页</tu-button>
        <tu-button round>第2页</tu-button>
        <tu-button round>第3页</tu-button>
        <tu-button round>下一页</tu-button>
      </tu-button-group>
    </div>
    <h2>文本按钮</h2>
    <div class="test-row">
      <tu-button icon="info" text>默认按钮</tu-button>
      <tu-button type="primary" text>主要按钮</tu-button>
      <tu-button type="success" text>成功按钮</tu-button>
      <tu-button type="info" text>信息按钮</tu-button>
      <tu-button type="warning" text>警告按钮</tu-button>
      <tu-button type="error" text>错误按钮</tu-button>
    </div>
    <h2>圆角按钮</h2>
    <div class="test-row">
      <tu-button size="small" round>默认按钮</tu-button>
      <tu-button size="small" type="primary" round>主要按钮</tu-button>
      <tu-button size="small" type="success" round>成功按钮</tu-button>
      <tu-button size="small" type="info" round>信息按钮</tu-button>
      <tu-button size="small" type="warning" round>警告按钮</tu-button>
      <tu-button size="small" type="error" round>错误按钮</tu-button>
    </div>
    <div class="test-row">
      <tu-button round>默认按钮</tu-button>
      <tu-button type="primary" round>主要按钮</tu-button>
      <tu-button type="success" round>成功按钮</tu-button>
      <tu-button type="info" round>信息按钮</tu-button>
      <tu-button type="warning" round>警告按钮</tu-button>
      <tu-button type="error" round>错误按钮</tu-button>
    </div>

    <div class="test-row">
      <tu-button size="large" round>默认按钮</tu-button>
      <tu-button size="large" type="primary" round>主要按钮</tu-button>
      <tu-button size="large" type="success" round>成功按钮</tu-button>
      <tu-button size="large" type="info" round>信息按钮</tu-button>
      <tu-button size="large" type="warning" round>警告按钮</tu-button>
      <tu-button size="large" type="error" round>错误按钮</tu-button>
    </div>

    <h2>圆角图标</h2>
    <div class="test-row">
      <tu-button icon="info" size="small" circle />
      <tu-button icon="info" size="small" type="primary" circle />
      <tu-button icon="info" size="small" type="success" circle />
      <tu-button icon="info" size="small" type="info" circle />
      <tu-button icon="info" size="small" type="warning" circle />
      <tu-button icon="info" size="small" type="error" circle />
    </div>
    <div class="test-row">
      <tu-button icon="info" circle />
      <tu-button icon="info" type="primary" circle />
      <tu-button icon="info" type="success" circle />
      <tu-button icon="info" type="info" circle />
      <tu-button icon="info" type="warning" circle />
      <tu-button icon="info" type="error" circle />
    </div>
    <div class="test-row">
      <tu-button icon="info" size="large" circle />
      <tu-button icon="info" size="large" type="primary" circle />
      <tu-button icon="info" size="large" type="success" circle />
      <tu-button icon="info" size="large" type="info" circle />
      <tu-button icon="info" size="large" type="warning" circle />
      <tu-button icon="info" size="large" type="error" circle />
    </div>
    <h2>基本按钮测试</h2>
    <div class="test-row">
      <tu-button>默认按钮</tu-button>
      <tu-button type="primary">主要按钮</tu-button>
      <tu-button type="success">成功按钮</tu-button>
      <tu-button type="info">信息按钮</tu-button>
      <tu-button type="warning">警告按钮</tu-button>
      <tu-button type="error">错误按钮</tu-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style lang="stylus">
.test-row {
  margin: 20px 0;
  .tu-button {
    margin-right: 10px;
  }
}
.button-group-row {
  margin-bottom: 20px;
}
</style>
