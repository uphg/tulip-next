# Image 图片

图片引用

## 基本用法

基本图片

::: demo

image/base

:::

## 分组

可以对图片进行分组

::: demo

image/group

:::



## Image 属性

| 名称        | 说明                                                         | 类型                                                       | 默认值      |
| ----------- | ------------------------------------------------------------ | ---------------------------------------------------------- | ----------- |
| src         | 图片路径（必填）                                             | `string`                                                   | `undefined` |
| preview-src | 预览图片路径（不传默认图片路径）                             | `string`                                                   | `undefined` |
| alt         | 图片说明                                                     | `string`                                                   | `undefined` |
| object-fit  | 原生 object-fit 属性，见 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `undefined` |
| width       | 图片宽度                                                     | `string \| number`                                         | `undefined` |
| height      | 图片高度                                                     | `string \|number`                                          | `undefined` |
| on-error    | 图片加载失败的回调函数                                       | `(e: Event) => void`                                       | `undefined` |
| on-load     | 图片加载完成的回调函数                                       | `(e: Event) => void`                                       | `undefined` |



<script setup lang="ts">
import ImageBase from '../examples/image/base.vue'
import ImageGroup from '../examples/image/group.vue'
</script>