<template>
  <h2>Tree 组件</h2>
  <tu-tree :data="data"/>

  <h2>Tree 复选框</h2>
  <tu-tree :data="data" checkable/>

  <h2>Tree 复选框（受控）</h2>
  <tu-tree :data="data" v-model:checked-keys="checkedKeys" checkable/>

  <h2>Tree 复选框（级联选择）</h2>
  <tu-tree :data="data" v-model:checked-keys="checkedKeys2" checkable cascade/>

  <h2>Tree 组件 level</h2>
  <tu-tree :data="data2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedKeys = ref([])
const checkedKeys2 = ref([])
const data = ref([
  {
    label: '第1层',
    key: '1',
    children: [
      {
        label: '第1-1层',
        key: '1-1',
        disabled: true,
      },
      {
        label: '第1-2层',
        key: '1-2',
      },
      {
        label: '第1-3层',
        key: '1-3',
      },
      {
        label: '第1-4层',
        key: '1-4',
        children: [
          {
            label: '第1-4-1层',
            key: '1-4-1',
          },
          {
            label: '第1-4-2层',
            key: '1-4-2',
            children: [
              {
                label: '第1-4-2-1层',
                key: '1-4-2-1',
              },
              {
                label: '第1-4-2-2层',
                key: '1-4-2-2',
                disabled: true,
              },
              {
                label: '第1-4-2-3层',
                key: '1-4-2-3',
              }
            ]
          },
          {
            label: '第1-4-3层',
            key: '1-4-3',
          },
        ]
      },
      {
        label: '第1-5层',
        key: '1-5',
      }
    ]
  },
  {
    label: '第2层',
    key: '2',
    disabled: true,
    children: [
      {
        label: '第2-1层',
        key: '2-1',
      },
      {
        label: '第2-2层',
        key: '2-2',
      },
      {
        label: '第2-3层',
        key: '2-3',
      },
      {
        label: '第2-4层',
        key: '2-4',
        disabled: true,
        children: [
          {
            label: '第2-4-1层',
            key: '2-4-1',
          },
          {
            label: '第2-4-2层',
            key: '2-4-2',
          },
          {
            label: '第2-4-3层',
            key: '2-4-3',
          },
        ]
      },
      {
        label: '第2-5层',
        key: '2-5',
      }
    ]
  },
  {
    label: '第3层',
    key: '3',
    children: [
      {
        label: '第3-1层',
        key: '3-1',
      },
      {
        label: '第3-2层',
        key: '3-2',
      },
      {
        label: '第3-3层',
        key: '3-3',
      },
      {
        label: '第3-4层',
        key: '3-4',
        children: [
          {
            label: '第3-4-1层',
            key: '3-4-1',
          },
          {
            label: '第3-4-2层',
            key: '3-4-2',
          },
          {
            label: '第3-4-3层',
            key: '3-4-3',
          },
        ]
      },
      {
        label: '第3-5层',
        key: '3-5',
      }
    ]
  }
])

// [1]
const data2 = ref([
  {
    label: '第1层',
    key: '1',
    children: [
      {
        label: '第1-1层',
        key: '1-1',
      },
      {
        label: '第1-2层',
        key: '1-2',
        children: [
          {
            label: '第1-2-1层',
            key: '1-2-1',
          },
          {
            label: '第1-2-2层',
            key: '1-2-2',
          },
          {
            label: '第1-2-3层',
            key: '1-2-3',
          }
        ]
      },
      {
        label: '第1-3层',
        key: '1-3',
      }
    ]
  },
  {
    label: '第2层',
    key: '2'
  },
  {
    label: '第3层',
    key: '3'
  }
])
</script>