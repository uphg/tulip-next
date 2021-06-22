<template>
  <div class="button-demo">
    <h2>带有过渡效果的 loading</h2>
    <div>
      <t-button :loading="loading" @click="loading = !loading">默认按钮</t-button>
    </div>
    <h2>大号按钮</h2>
    <div class="row">
      <span class="label">普通按钮：</span>
      <t-button size="big">默认按钮</t-button>
      <t-button size="big" round>默认按钮</t-button>
      <t-button size="big" type="primary">主要按钮</t-button>
      <t-button size="big" type="success">成功按钮</t-button>
      <t-button size="big" type="info">信息按钮</t-button>
      <t-button size="big" type="warning">警告按钮</t-button>
      <t-button size="big" type="error">危险按钮</t-button>
    </div>
    <h2>按钮</h2>
    <div class="row">
      <span class="label">英文：</span>
      <t-button @click="clickButton">Default</t-button>
      <t-button type="primary">Primary</t-button>
      <t-button type="success">Success</t-button>
      <t-button type="info">Info</t-button>
      <t-button type="warning">Warning</t-button>
      <t-button type="error">Error</t-button>
    </div>
    <h2>迷你按钮</h2>
    <div class="row">
      <span class="label">普通按钮：</span>
      <t-button size="small">默认按钮</t-button>
      <t-button size="small" round>默认按钮</t-button>
      <t-button size="small" type="primary">主要按钮</t-button>
      <t-button size="small" type="success">成功按钮</t-button>
      <t-button size="small" type="info">信息按钮</t-button>
      <t-button size="small" type="warning">警告按钮</t-button>
      <t-button size="small" type="error">危险按钮</t-button>
    </div>

    <div class="row">
      <span class="label">普通按钮：</span>
      <t-button>默认按钮</t-button>
      <t-button type="primary">主要按钮</t-button>
      <t-button type="success">成功按钮</t-button>
      <t-button type="info">信息按钮</t-button>
      <t-button type="warning">警告按钮</t-button>
      <t-button type="error">危险按钮</t-button>
    </div>
    <div class="row">
      <span class="label">文本按钮：</span>
      <t-button text>默认按钮</t-button>
      <t-button type="primary" text>主要按钮</t-button>
      <t-button type="primary" text loading>主要按钮</t-button>
      <t-button type="success" text>成功按钮</t-button>
      <t-button type="info" text>信息按钮</t-button>
      <t-button type="warning" text>警告按钮</t-button>
      <t-button type="error" text>危险按钮</t-button>
    </div>
    <div class="row">
      <span class="label">透明背景：</span>
      <t-button ghost>默认按钮</t-button>
      <t-button type="primary" ghost>主要按钮</t-button>
      <t-button type="success" ghost>成功按钮</t-button>
      <t-button type="info" ghost>信息按钮</t-button>
      <t-button type="warning" ghost>警告按钮</t-button>
      <t-button type="error" ghost>危险按钮</t-button>
    </div>
    <div class="row">
      <span class="label">圆角按钮：</span>
      <t-button round>默认按钮</t-button>
      <t-button type="primary" round>主要按钮</t-button>
      <t-button type="error" round>警告按钮</t-button>
    </div>
    <div class="row">
      <span class="label">圆角Icon：</span>
      <t-button icon="calendar" circle />
      <t-button icon="search" circle />
      <t-button type="primary" icon="calendar" circle />
      <t-button type="error" icon="calendar-dates" circle />
    </div>
    <div class="row">
      <span class="label">透明背景：</span>
      <t-button ghost loading>默认按钮</t-button>
      <t-button type="primary" ghost loading>主要按钮</t-button>
      <t-button type="error" ghost loading>警告按钮</t-button>
    </div>
    <div class="row">
      <span class="label">虚线按钮：</span>
      <t-button dashed>默认按钮</t-button>
      <t-button type="primary" dashed>主要按钮</t-button>
      <t-button type="error" dashed>警告按钮</t-button>
    </div>
    <div class="row">
      <span class="label">虚线按钮：</span>
      <t-button dashed loading>默认按钮</t-button>
      <t-button type="primary" dashed loading>主要按钮</t-button>
      <t-button type="error" dashed loading>警告按钮</t-button>
    </div>
    <div class="row">
      <span class="label">Icon 按钮：</span>
      <t-button icon="calendar" />
      <t-button icon="search">默认按钮</t-button>
      <t-button type="primary" icon="calendar">主要按钮</t-button>
      <t-button type="error" icon="calendar-dates">警告按钮</t-button>
    </div>
    <div class="row">
      <span class="label">禁用状态：</span>
      <t-button disabled>默认按钮</t-button>
      <t-button type="primary" disabled>主要按钮</t-button>
      <t-button type="error" disabled>警告按钮</t-button>
    </div>
    <div class="row">
      <span class="label">Loading 按钮：</span>
      <t-button loading>默认按钮</t-button>
      <t-button type="primary" loading>主要按钮</t-button>
      <t-button type="error" loading>警告按钮</t-button>
    </div>
    <h2>按钮组</h2>
    <div class="row button-group">
      <t-button-group style="margin-right: 20px; margin-bottom: 20px;">
        <t-button>上一页</t-button>
        <t-button>当前页</t-button>
        <t-button>下一页</t-button>
      </t-button-group>
      <t-button-group style="margin-right: 20px; margin-bottom: 20px;">
        <t-button round>上一页</t-button>
        <t-button round>当前页</t-button>
        <t-button round>下一页</t-button>
      </t-button-group>
      <t-button-group style="margin-right: 20px; margin-bottom: 20px;">
        <t-button type="primary">上一页</t-button>
        <t-button type="primary">当前页</t-button>
        <t-button type="primary">下一页</t-button>
      </t-button-group>
      <t-button-group style="margin-right: 20px; margin-bottom: 20px;">
        <t-button type="error">上一页</t-button>
        <t-button type="error">当前页</t-button>
        <t-button type="error">下一页</t-button>
      </t-button-group>
      <t-button-group />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    }
  }
}
</script>
