# Pagination 分页

分页组件

## 基础用法

帮你节省翻页空间

::: demo

pagination/base

:::

## Pagination 属性

| 名称     | 说明     | 类型     | 默认值      |
| -------- | -------- | -------- | ----------- |
| current  | 当前页   | `number` | `1`         |
| page-size | 每页条数 | `number` | `10`        |
| total    | 总条目数 | `number` | `undefined` |

## Pagination 事件

| 名称           | 说明             | 参数                |
| -------------- | ---------------- | ------------------- |
| update:current | 更新当前页时触发 | `(current: number)` |



<script setup lang="ts">
import PaginationBase from '../examples/pagination/base.vue'
</script>