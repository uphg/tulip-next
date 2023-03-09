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
import SelectDemo from './views/SelectDemo.vue'
import SelectionInputDemo from './views/SelectionInputDemo.vue'
import CardDemo from './views/CardDemo.vue'
import DividerDemo from './views/DividerDemo.vue'
import LayoutDemo from './views/LayoutDemo.vue'
import TreeDemo from './views/TreeDemo.vue'

import TransitionDemo from './views/TransitionDemo'
import TransitionDemo2 from './views/TransitionDemo.vue'
import TestTransition from './views/TestTransition'
import { shallowRef } from 'vue'
import CollapseTransitionDemo from './views/CollapseTransitionDemo.vue'

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
  },
  {
    title: 'SelectInput 选择器输入框',
    component: SelectionInputDemo
  },
  {
    title: 'Select 选择器',
    component: SelectDemo
  },
  {
    title: 'Card 卡片',
    component: CardDemo
  },
  {
    title: 'Divider 分割线',
    component: DividerDemo
  },
  {
    title: 'Layout 布局',
    component: LayoutDemo
  },
  {
    title: 'Tree 树',
    component: TreeDemo
  },
  {
    title: 'CollapseTransition 过渡',
    component: CollapseTransitionDemo
  }
  // {
  //   title: '过渡1',
  //   component: TransitionDemo
  // },
  // {
  //   title: '过渡2',
  //   component: TestTransition
  // },
  // {
  //   title: '过渡3',
  //   component: TransitionDemo2
  // }
]

const current = shallowRef(sidebar[sidebar.length - 1])
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>