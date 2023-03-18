<template>
  <div class="cascader-demo">
    <div><tu-cascader :options="options" clearable/></div>
    <br />
    <div><tu-cascader v-model:value="value" :options="options" clearable/></div>
    <br />
    <div><tu-cascader v-model:value="value2" :options="options"/></div>
    <br />
    <div><tu-cascader v-model:value="value3" :options="options"/></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(null)
const value2 = ref(['1', '1-2'])
const value3 = ref(['2', '2-5',  '2-5-10'])

const options = ref([
  {
    label: '选项 1',
    value: '1',
    children: [
      {
        label: '选项 1-1',
        value: '1-1',
        children: [
          {
            label: '选项 1-1-1',
            value: '1-1-1'
          },
          {
            label: '选项 1-1-2',
            value: '1-1-2'
          },
          {
            label: '选项 1-1-3',
            value: '1-1-3'
          },
          {
            label: '选项 1-1-4',
            value: '1-1-4'
          },
          {
            label: '选项 1-1-5',
            value: '1-1-5'
          },
        ]
      },
      {
        label: '选项 1-2',
        value: '1-2',
        children: [
          {
            label: '选项 1-2-1',
            value: '1-2-1'
          },
          {
            label: '选项 1-2-2',
            value: '1-2-2'
          },
          {
            label: '选项 1-2-3',
            value: '1-2-3'
          },
          {
            label: '选项 1-2-4',
            value: '1-2-4'
          },
          {
            label: '选项 1-2-5',
            value: '1-2-5'
          },
        ]
      },
      {
        label: '选项 1-3',
        value: '1-3',
        children: [
          {
            label: '选项 1-3-1',
            value: '1-3-1'
          },
          {
            label: '选项 1-3-2',
            value: '1-3-2'
          },
          {
            label: '选项 1-3-3',
            value: '1-3-3'
          },
          {
            label: '选项 1-3-4',
            value: '1-3-4'
          },
          {
            label: '选项 1-3-5',
            value: '1-3-5'
          },
        ]
      },
      {
        label: '选项 1-4',
        value: '1-4',
        children: [
          {
            label: '选项 1-4-1',
            value: '1-4-1'
          },
          {
            label: '选项 1-4-2',
            value: '1-4-2'
          },
          {
            label: '选项 1-4-3',
            value: '1-4-3'
          },
          {
            label: '选项 1-4-4',
            value: '1-4-4'
          },
          {
            label: '选项 1-4-5',
            value: '1-4-5'
          },
        ]
      },
      {
        label: '选项 1-5',
        value: '1-5',
        children: [
          {
            label: '选项 1-5-1',
            value: '1-5-1'
          },
          {
            label: '选项 1-5-2',
            value: '1-5-2'
          },
          {
            label: '选项 1-5-3',
            value: '1-5-3'
          },
          {
            label: '选项 1-5-4',
            value: '1-5-4'
          },
          {
            label: '选项 1-5-5',
            value: '1-5-5'
          },
        ]
      }
    ]
  },
  {
    label: '选项 2',
    value: '2',
    children: [
      {
        label: '选项 2-1',
        value: '2-1',
        children: [
          {
            label: '选项 2-1-1',
            value: '2-1-1'
          },
          {
            label: '选项 2-1-2',
            value: '2-1-2'
          },
          {
            label: '选项 2-1-3',
            value: '2-1-3'
          },
          {
            label: '选项 2-1-4',
            value: '2-1-4'
          },
          {
            label: '选项 2-1-5',
            value: '2-1-5'
          },
        ]
      },
      {
        label: '选项 2-2',
        value: '2-2',
        disabled: true,
        children: [
          {
            label: '选项 2-2-1',
            value: '2-2-1'
          },
          {
            label: '选项 2-2-2',
            value: '2-2-2'
          },
          {
            label: '选项 2-2-3',
            value: '2-2-3'
          },
          {
            label: '选项 2-2-4',
            value: '2-2-4'
          },
          {
            label: '选项 2-2-5',
            value: '2-2-5'
          },
        ]
      },
      {
        label: '选项 2-3',
        value: '2-3',
        children: [
          {
            label: '选项 2-3-1',
            value: '2-3-1'
          },
          {
            label: '选项 2-3-2',
            value: '2-3-2'
          },
          {
            label: '选项 2-3-3',
            value: '2-3-3'
          },
          {
            label: '选项 2-3-4',
            value: '2-3-4'
          },
          {
            label: '选项 2-3-5',
            value: '2-3-5'
          },
        ]
      },
      {
        label: '选项 2-4',
        value: '2-4',
        children: [
          {
            label: '选项 2-4-1',
            value: '2-4-1'
          },
          {
            label: '选项 2-4-2',
            value: '2-4-2'
          },
          {
            label: '选项 2-4-3',
            value: '2-4-3'
          },
          {
            label: '选项 2-4-4',
            value: '2-4-4'
          },
          {
            label: '选项 2-4-5',
            value: '2-4-5'
          },
        ]
      },
      {
        label: '选项 2-5',
        value: '2-5',
        children: [
          {
            label: '选项 2-5-1',
            value: '2-5-1'
          },
          {
            label: '选项 2-5-2',
            value: '2-5-2'
          },
          {
            label: '选项 2-5-3',
            value: '2-5-3'
          },
          {
            label: '选项 2-5-4',
            value: '2-5-4'
          },
          {
            label: '选项 2-5-5',
            value: '2-5-5'
          },
          {
            label: '选项 2-5-6',
            value: '2-5-6'
          },
          {
            label: '选项 2-5-7',
            value: '2-5-7'
          },
          {
            label: '选项 2-5-8',
            value: '2-5-8'
          },
          {
            label: '选项 2-5-9',
            value: '2-5-9'
          },
          {
            label: '选项 2-5-10',
            value: '2-5-10'
          },
          {
            label: '选项 2-5-11',
            value: '2-5-11'
          },
        ]
      }
    ]
  },
  {
    label: '选项 3',
    value: '3',
    children: [
      {
        label: '选项 3-1',
        value: '3-1',
        children: [
          {
            label: '选项 3-1-1',
            value: '3-1-1'
          },
          {
            label: '选项 3-1-2',
            value: '3-1-2'
          },
          {
            label: '选项 3-1-3',
            value: '3-1-3'
          },
          {
            label: '选项 3-1-4',
            value: '3-1-4'
          },
          {
            label: '选项 3-1-5',
            value: '3-1-5'
          },
        ]
      },
      {
        label: '选项 3-2',
        value: '3-2',
        children: [
          {
            label: '选项 3-2-1',
            value: '3-2-1'
          },
          {
            label: '选项 3-2-2',
            value: '3-2-2'
          },
          {
            label: '选项 3-2-3',
            value: '3-2-3'
          },
          {
            label: '选项 3-2-4',
            value: '3-2-4'
          },
          {
            label: '选项 3-2-5',
            value: '3-2-5'
          },
        ]
      },
      {
        label: '选项 3-3',
        value: '3-3',
        children: [
          {
            label: '选项 3-3-1',
            value: '3-3-1'
          },
          {
            label: '选项 3-3-2',
            value: '3-3-2'
          },
          {
            label: '选项 3-3-3',
            value: '3-3-3'
          },
          {
            label: '选项 3-3-4',
            value: '3-3-4'
          },
          {
            label: '选项 3-3-5',
            value: '3-3-5'
          },
        ]
      },
      {
        label: '选项 3-4',
        value: '3-4',
        children: [
          {
            label: '选项 3-4-1',
            value: '3-4-1'
          },
          {
            label: '选项 3-4-2',
            value: '3-4-2'
          },
          {
            label: '选项 3-4-3',
            value: '3-4-3'
          },
          {
            label: '选项 3-4-4',
            value: '3-4-4'
          },
          {
            label: '选项 3-4-5',
            value: '3-4-5'
          },
        ]
      },
      {
        label: '选项 3-5',
        value: '3-5',
        children: [
          {
            label: '选项 3-5-1',
            value: '3-5-1'
          },
          {
            label: '选项 3-5-2',
            value: '3-5-2'
          },
          {
            label: '选项 3-5-3',
            value: '3-5-3'
          },
          {
            label: '选项 3-5-4',
            value: '3-5-4'
          },
          {
            label: '选项 3-5-5',
            value: '3-5-5'
          },
        ]
      }
    ]
  },
  {
    label: '选项 4',
    value: '4',
    children: [
      {
        label: '选项 4-1',
        value: '4-1',
        children: [
          {
            label: '选项 4-1-1',
            value: '4-1-1'
          },
          {
            label: '选项 4-1-2',
            value: '4-1-2'
          },
          {
            label: '选项 4-1-3',
            value: '4-1-3'
          },
          {
            label: '选项 4-1-4',
            value: '4-1-4'
          },
          {
            label: '选项 4-1-5',
            value: '4-1-5'
          },
        ]
      },
      {
        label: '选项 4-2',
        value: '4-2',
        children: [
          {
            label: '选项 4-2-1',
            value: '4-2-1'
          },
          {
            label: '选项 4-2-2',
            value: '4-2-2'
          },
          {
            label: '选项 4-2-3',
            value: '4-2-3'
          },
          {
            label: '选项 4-2-4',
            value: '4-2-4'
          },
          {
            label: '选项 4-2-5',
            value: '4-2-5'
          },
        ]
      },
      {
        label: '选项 4-3',
        value: '4-3',
        children: [
          {
            label: '选项 4-3-1',
            value: '4-3-1'
          },
          {
            label: '选项 4-3-2',
            value: '4-3-2'
          },
          {
            label: '选项 4-3-3',
            value: '4-3-3'
          },
          {
            label: '选项 4-3-4',
            value: '4-3-4'
          },
          {
            label: '选项 4-3-5',
            value: '4-3-5'
          },
        ]
      },
      {
        label: '选项 4-4',
        value: '4-4',
        children: [
          {
            label: '选项 4-4-1',
            value: '4-4-1'
          },
          {
            label: '选项 4-4-2',
            value: '4-4-2'
          },
          {
            label: '选项 4-4-3',
            value: '4-4-3'
          },
          {
            label: '选项 4-4-4',
            value: '4-4-4'
          },
          {
            label: '选项 4-4-5',
            value: '4-4-5'
          },
        ]
      },
      {
        label: '选项 4-5',
        value: '4-5',
        children: [
          {
            label: '选项 4-5-1',
            value: '4-5-1'
          },
          {
            label: '选项 4-5-2',
            value: '4-5-2'
          },
          {
            label: '选项 4-5-3',
            value: '4-5-3'
          },
          {
            label: '选项 4-5-4',
            value: '4-5-4'
          },
          {
            label: '选项 4-5-5',
            value: '4-5-5'
          },
        ]
      }
    ]
  },
  {
    label: '选项 5',
    value: '5',
    children: [
      {
        label: '选项 5-1',
        value: '5-1',
        children: [
          {
            label: '选项 5-1-1',
            value: '5-1-1'
          },
          {
            label: '选项 5-1-2',
            value: '5-1-2'
          },
          {
            label: '选项 5-1-3',
            value: '5-1-3'
          },
          {
            label: '选项 5-1-4',
            value: '5-1-4'
          },
          {
            label: '选项 5-1-5',
            value: '5-1-5'
          },
        ]
      },
      {
        label: '选项 5-2',
        value: '5-2',
        children: [
          {
            label: '选项 5-2-1',
            value: '5-2-1'
          },
          {
            label: '选项 5-2-2',
            value: '5-2-2'
          },
          {
            label: '选项 5-2-3',
            value: '5-2-3'
          },
          {
            label: '选项 5-2-4',
            value: '5-2-4'
          },
          {
            label: '选项 5-2-5',
            value: '5-2-5'
          },
        ]
      },
      {
        label: '选项 5-3',
        value: '5-3',
        children: [
          {
            label: '选项 5-3-1',
            value: '5-3-1'
          },
          {
            label: '选项 5-3-2',
            value: '5-3-2'
          },
          {
            label: '选项 5-3-3',
            value: '5-3-3'
          },
          {
            label: '选项 5-3-4',
            value: '5-3-4'
          },
          {
            label: '选项 5-3-5',
            value: '5-3-5'
          },
        ]
      },
      {
        label: '选项 5-4',
        value: '5-4',
        children: [
          {
            label: '选项 5-4-1',
            value: '5-4-1'
          },
          {
            label: '选项 5-4-2',
            value: '5-4-2'
          },
          {
            label: '选项 5-4-3',
            value: '5-4-3'
          },
          {
            label: '选项 5-4-4',
            value: '5-4-4'
          },
          {
            label: '选项 5-4-5',
            value: '5-4-5'
          },
        ]
      },
      {
        label: '选项 5-5',
        value: '5-5',
        children: [
          {
            label: '选项 5-5-1',
            value: '5-5-1'
          },
          {
            label: '选项 5-5-2',
            value: '5-5-2'
          },
          {
            label: '选项 5-5-3',
            value: '5-5-3'
          },
          {
            label: '选项 5-5-4',
            value: '5-5-4'
          },
          {
            label: '选项 5-5-5',
            value: '5-5-5'
          },
        ]
      }
    ]
  }
])
</script>

<style lang="stylus">
.cascader-demo
  width 380px
  padding 36px
</style>