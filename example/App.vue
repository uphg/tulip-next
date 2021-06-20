<template>
  <div id="app">
    <div>
      <t-countdown
        ref="countdown2"
        prompt="秒后重新发送"
        :begin-second="5"
        :loading="countLoading"
        @count-start="isCount2 = true"
        @count-end="isCount2 = false"
        @click="countLoading = !countLoading"
      />
    </div>
    <h2>带有过渡效果的 loading</h2>
    <div>
      <t-button :loading="loading" @click="clickLoading">默认按钮</t-button>
    </div>
    <h2>输入框</h2>
    <div>
      <t-input v-model="input" value="123">
        <t-icon slot="prefix" name="close-o" />
        <t-icon slot="suffix" name="close-o" />
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <br>
    <div>
      <t-input v-model="input" prefix-icon="share" value="123" suffix-icon="share">
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <br>
    <div>
      <t-input v-model="input" prefix-icon="share" value="123" show-password>
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <br>
    <div class="row demo-input-addon">
      <t-input v-model="input" value="123">
        <template slot="before">http://</template>
      </t-input>
      <br>
      <br>
      <t-input v-model="input" value="123">
        <template slot="after">.com</template>
      </t-input>
      <br>
      <br>
      <t-input v-model="input" value="123">
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <div class="row demo-input">
      <t-input v-model="input" value="123" />
      <t-input v-model="input4" placeholder="请输入内容" />
      <t-input disabled placeholder="请输入内容" />
      <br>
      <br>
      <t-input v-model="input2" show-password class="show-password-demo" />
      <t-input v-model="input3" clearable />

      <p>{{ 'input：' + input }}</p>
      <p>{{ 'input2：' + input2 }}</p>
      <p>{{ 'input3：' + input3 }}</p>
      <p>{{ 'input4：' + input4 }}</p>
      <div>
        <t-input v-model="input5" type="textarea" placeholder="请输入内容" />
        <p>{{ 'input5：' + input5 }}</p>
      </div>
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
    <h2>倒计时</h2>
    <div class="row">
      <span class="label">倒计时按钮：</span>
      <t-countdown
        ref="countdown"
        prompt="秒后重新发送"
        :begin-second="5"
        @count-start="isCount = true"
        @count-end="isCount = false"
        @click="clickCount"
      />
    </div>
    <h2>Icon 图标</h2>
    <div class="row icon-list">
      <span class="label">Icon 组件：</span>
      <t-icon name="alarm" />
      <t-icon name="aspect-ratio" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loading: false,
      isLoading: true,
      isCount: false,
      isCount2: false,
      countLoading: false,
      input: '我是input',
      input2: '我是input',
      input3: '我是input',
      input4: '',
      input5: ''
    }
  },
  methods: {
    clickLoading() {
      console.log('被点了')
      this.loading = !this.loading
    },
    clickButton(e) {
      console.log('我被触发了')
      console.log('event')
      console.log(e)
    },
    clickCount() {
      if (!this.isCount) {
        this.$refs['countdown'].startCount()
      }
    },
    clickCount2() {
      if (!this.isCount2) {
        this.$refs['countdown2'].startCount()
      }
    },
    setIconNameIndex() {
      if (this.iconNameIndex >= 2) {
        this.iconNameIndex = 0
        return
      }
      this.iconNameIndex += 1
    }
  }
}
</script>

<style lang="stylus">
*, *::after, *::before {
  box-sizing: border-box;
}
button, input, select, textarea {
  font-family: inherit;
}

#app {
  width: 820px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  // padding: {
  //   left: 20px;
  //   right: 20px;
  // }
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
h2 {
  text-align: center;
}

.row {
  margin-top: 20px;
  margin-bottom: 20px;
  // margin: {
  //   top: 20px;
  //   bottom: 20px;
  // }
  &:not(.button-group) {
    button {
      margin-right: 15px;
    }
  }
}
.icon-list > [class^="t-icon-"] {
  margin-right: 20px;
}
.label {
  text-align: right;
  width: 120px;
  display: inline-block;
  padding-right: 10px;
}
.show-password-demo {
  & > input {
    line-height: 34px;
    padding: 0 14px;
  }
}
.demo-input {
  .t-input {
    width: 180px;
  }
}
.demo-input-addon {
  .t-input {
    width: 360px;
  }
}
.demo-icon-svg {
  color: blue;
  svg {
    width: 1em;
    height: 1em;
  }
}
</style>
