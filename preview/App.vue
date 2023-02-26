<template>
  <div class="app">
    <Layout :sidebar="sidebar" v-model:current="current"/>
  </div>
</template>

<script setup lang="ts">
import Layout from './layout/index.vue'
import RadioDemo from './views/RadioDemo.vue'
import CheckboxDemo from './views/CheckboxDemo.vue'
import ModalDemo from './views/ModalDemo.vue'
import CascaderDemo from './views/CascaderDemo.vue'
import { shallowRef } from 'vue'

const sidebar = [
  {
    title: 'Radio 单选框',
    component: RadioDemo
  },
  {
    title: 'Checkbox 复选框',
    component: CheckboxDemo
  },
  {
    title: 'Modal 模态框',
    component: ModalDemo
  },
  {
    title: 'Cascader 级联选择器',
    component: CascaderDemo
  }
]

const current = shallowRef(sidebar[2])
</script>
