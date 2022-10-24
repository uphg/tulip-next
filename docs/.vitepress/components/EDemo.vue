<template>
  <div class="e-demo">
    <div class="component">
      <component :is="componentIs" />
    </div>
    <CollapseTransition>
      <div v-show="visible">
        <div class="code-source language-vue" v-html="decodeURIComponent(html)"></div>
      </div>
    </CollapseTransition>
    <div class="control" @click="visible = !visible">{{ `${visible ? '收起' : '展开'}源码` }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CollapseTransition } from '../../../src/index'

const props = defineProps({
  source: {
    type: String,
    default: ''
  },
  html: {
    type: String,
    default: ''
  },
  componentName: String,
  part: [Object]
})

const visible = ref(false)

const componentIs = { ...props.part, name: props.componentName }
</script>

<style scoped>
.e-demo {
  width: 100%;
  border-radius: 6px;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
  overflow: hidden;
}
.component {
  padding: 22px 24px;
}
.e-demo .code-source {
  width: 100%;
  border-top: 1px solid var(--vp-c-divider-light);
  color: #fff;
  overflow-x: auto;
  margin: 0;
  border-radius: 0;
}
:deep(.code-source pre) {
  margin: 0;
  border-radius: 0;
}
.control {
  border-top: 1px solid var(--vp-c-divider-light);
  font-size: 14px;
  cursor: pointer;
  height: 42px;
  line-height: 42px;
  text-align: center;
  user-select:none;
}
</style>
