# Tree 树

树形结构

## 基础用法

::: demo

tree/base

:::

## 多选

::: demo

tree/checkable

:::

## 级联选择

添加 cascade 属性配置级联选择

::: demo

tree/cascade

:::

## 禁用节点

::: demo

tree/disabled

:::

## Tree 属性

| 名称                | 说明 | 类型 | 默认值 |
| ------------------- | ---- | ---- | ------ |
| data                | 树的节点数据 | `Array<TreeNodeMeta>` | `[]` |
| cascade             | 是否级联选择 | `boolean` | `false` |
| checkable           | 是否多选 | `boolean` | `false` |
| checked-keys         | 复选受控状态的 key | `Array<string \| number>` | `undefined` |
| expanded-keys        | 展开受控状态的 key | `Array<string \| number>` | `undefined` |
| indeterminate-keys   | 部分选中选中的 key | `Array<string \| number>` | `undefined` |
| defaultChecked-keys  | 默认复选选中的节点 | `Array<string \| number>` | `undefined` |
| defaultExpanded-keys | 默认展开项 | `Array<string \| number>` | `undefined` |
| label-field          | 节点 label 字段名 | `string` | `'label'` |
| key-field            | 节点 key 字段名 | `string` | `'key'` |
| children-field       | 节点 children 字段名 | `string` | `'children'` |
| disabled-field       | 节点 disabled 字段名 | `string` | `'disabled'` |

## Tree 事件

| 名称                      | 说明                               | 参数                         |
| ------------------------- | ---------------------------------- | ---------------------------- |
| update:checked-keys       | 节点选中项更新时的回调函数         | `(value: TreeNodeMetaKey[])` |
| update:expanded-keys      | 节点展开/折叠状态更新的回调函数    | `(value: TreeNodeMetaKey[])` |
| update:indeterminate-keys | 节点部分选中状态项更新时的回调函数 | `(value: TreeNodeMetaKey[])` |




<script setup lang="ts">
import TreeBase from '../examples/tree/base.vue'
import TreeCheckable from '../examples/tree/checkable.vue'
import TreeCascade from '../examples/tree/cascade.vue'
import TreeDisabled from '../examples/tree/disabled.vue'
</script>
