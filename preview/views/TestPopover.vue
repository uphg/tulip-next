<template>
  <div style="padding-left: 200px;">
    <h2>Popover</h2>
    <div class="popover-demo">
      <tu-popover :content="content">
        <tu-button>悬浮</tu-button>
      </tu-popover>

      <tu-popover :content="content" trigger="click">
        <tu-button>点击</tu-button>
      </tu-popover>

      <tu-popover :content="content" trigger="focus">
        <tu-button>聚焦</tu-button>
      </tu-popover>

      <tu-popover :visible="visible" content="Hello, I am Jack" trigger="focus">
        <tu-button @click="visible = !visible">手动</tu-button>
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
        <div style="display: flex; flex-direction: column; gap: 16px;">
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
        <div style="display: flex; flex-direction: column; gap: 16px; margin-left: 340px;">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = 'Hello, I am Jack. Hello, I am Jack. Hello, I am Jack. Hello, I am Jack. Hello, I am Jack.'

const visible = ref(false)
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