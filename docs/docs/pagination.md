# Pagination 分页

分页组件

## 基础用法

::: demo

pagination/base

:::

## Pagination 属性

| 名称     | 说明     | 类型     | 默认值      |
| -------- | -------- | -------- | ----------- |
| current  | 当前页   | `number` | `1`         |
| pageSize | 每页条数 | `number` | `10`        |
| total    | 总条目数 | `number` | `undefined` |



<script setup lang="ts">
import PaginationBase from '../examples/pagination/base.vue'
</script>