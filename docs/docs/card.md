# Card 卡片

卡片容器。

## 基本用法

::: demo

card/base

:::

## Card 属性

| 名称          | 说明                | 类型                               | 默认值      |
| ------------- | ------------------- | ---------------------------------- | ----------- |
| title         | 标题                | `string`                           | `undefined` |
| bordered      | 是否存在外边框      | `boolean`                          | `true`      |
| hoverable     | 是否显示 hover 状态 | `boolean`                          | `false`     |
| header-style  | header 样式         | `string \| Record<string, string>` | `undefined` |
| content-style | content 样式        | `string \| Record<string, string>` | `undefined` |
| footer-style  | footer 样式         | `string \| Record<string, string>` | `undefined` |

## Card 插槽

| 名称    | 说明             | 参数 |
| ------- | ---------------- | ---- |
| header  | header 内容插槽  | `()` |
| headek  | 卡片右上角内容   | `()` |
| default | content 内容插槽 | `()` |
| footer  | footer 内容插槽  | `()` |

<script setup lang="ts">
import CardBase from '../examples/card/base.vue'
</script>