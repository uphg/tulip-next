<template>
  <div>
    <TuTabs v-model:value="active">
      <template #prefix>前缀</template>
      <TuTabPane name="a1" label="周董">爱在西元前</TuTabPane>
      <TuTabPane name="a2" label="李荣浩浩">李白</TuTabPane>
      <TuTabPane name="a3" label="邓紫棋">泡沫</TuTabPane>
      <div>hi</div>
      <template #suffix>后缀</template>
    </TuTabs>
    <h2>章节形式</h2>
    <TuTabs v-model:value="active" type="segment">
      <TuTabPane name="a1" label="周董">爱在西元前<br>稻香</TuTabPane>
      <TuTabPane name="a2" label="李荣浩浩">李白</TuTabPane>
      <TuTabPane name="a3" label="邓紫棋">泡沫<br>写不完的温柔<br>句号</TuTabPane>
      <div>hi</div>
    </TuTabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('a2')
</script>