<template>
  <div style="padding-left: 20px;">
    <h2>Popover</h2>
    <div class="popover-demo">
      <tu-popover>
        <template #trigger>
          <tu-button>悬浮</tu-button>
        </template>
        <p>{{ content }}</p>
      </tu-popover>

      <tu-popover :content="content" trigger="click">
        <tu-button>点击</tu-button>
      </tu-popover>

      <tu-popover :content="content" trigger="focus">
        <tu-button>聚焦</tu-button>
      </tu-popover>

      <tu-popover :visible="visible" :content="content" trigger="manual">
        <tu-button @click="visible = !visible">手动</tu-button>
      </tu-popover>
      <tu-popover :visible="visible2" :content="content" trigger="manual">
        <tu-button @click="visible2 = !visible2">手动</tu-button>
      </tu-popover>
      <tu-popover :visible="visible3" :content="content" trigger="manual">
        <tu-button @click="visible3 = !visible3">手动</tu-button>
      </tu-popover>
    </div>

    <div class="popover-demo">
      <tu-popover trigger="click">
        <template #content="{ close }">
          <p style="margin-bottom: 0.25em;">Hi, I am Jack</p>
          <tu-button type="primary" size="small" @click="close">关闭</tu-button>
        </template>
        <tu-button>点击（插槽关闭）</tu-button>
      </tu-popover>
    </div>

    <div class="popover-demo">
      <tu-popover content="Hi, I am Jack" trigger="click" hide-arrow>
        <tu-button>去掉箭头</tu-button>
      </tu-popover>
    </div>

    <div class="popover-demo-1">
      <div style="display:flex; gap: 16px; margin-left: 100px;">
        <tu-popover placement="top-start" :content="content" trigger="click">
          <tu-button>Top Start</tu-button>
        </tu-popover>
        <tu-popover :content="content" trigger="click">
          <tu-button>Top</tu-button>
        </tu-popover>
        <tu-popover placement="top-end" :content="content" trigger="click">
          <tu-button>Top End</tu-button>
        </tu-popover>
      </div>
      <div style="display: flex; width: 300px; padding: 12px 0; justify-content: space-between;">
        <div style="display: flex; flex-direction: column; gap: 40px;">
          <tu-popover placement="left-start" :content="content" trigger="click">
            <tu-button>Left Start</tu-button>
          </tu-popover>
          <tu-popover placement="left" :content="content" trigger="click">
            <tu-button>Left</tu-button>
          </tu-popover>
          <tu-popover placement="left-end" :content="content" trigger="click">
            <tu-button>Left End</tu-button>
          </tu-popover>
        </div>
        <div style="display: flex; flex-direction: column; gap: 40px; margin-left: 340px;">
          <tu-popover placement="right-start" :content="content" trigger="click">
            <tu-button>Right Start</tu-button>
          </tu-popover>
          <tu-popover placement="right" :content="content" trigger="click">
            <tu-button>Right</tu-button>
          </tu-popover>
          <tu-popover placement="right-end" :content="content" trigger="click">
            <tu-button>Right End</tu-button>
          </tu-popover>
        </div>
      </div>
      <div style="display: flex; margin-left: 100px;  gap: 16px;">
        <tu-popover placement="bottom-start" :content="content" trigger="click">
          <tu-button>Bottom Start</tu-button>
        </tu-popover>
        <tu-popover placement="bottom" :content="content" trigger="click">
          <tu-button>Bottom</tu-button>
        </tu-popover>
        <tu-popover placement="bottom-end" :content="content" trigger="click">
          <tu-button>Bottom End</tu-button>
        </tu-popover>
      </div>
    </div>
    <div class="popover-demo">
      <tu-popover :content="content" trigger="click" :style="{ color: 'red' }" class="hi">
        <tu-button>属性继承</tu-button>
      </tu-popover>
    </div>
    <div class="popover-demo">
      <tu-tooltip :content="content" :disabled="disabled" trigger="click">
        <tu-button>点我</tu-button>
      </tu-tooltip>
      <tu-button @click="disabled = !disabled">切换 disabled</tu-button>        
    </div>
    <div class="popover-demo">
      <tu-popover trigger="click" raw>
        <template #content>
          <div style="background-color: #039be5; width: 200px; height: 200px;">
            我的自定义内容
          </div>
        </template>
        <tu-button>点我</tu-button>
      </tu-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref(`哈哈哈哈哈哈哈哈哈哈哈哈哈哈`)

const disabled = ref(false)
const visible = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>

<style lang="stylus">
.popover-demo {
  border: 1px solid #efeff5;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  justify-content: space-between;
}
.popover-demo-1 {
  margin-top: 20px;
  border: 1px solid #efeff5;
  padding: 20px;
  .tu-button {
    width: 100px;
  }
}
</style>