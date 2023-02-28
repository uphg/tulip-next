<template>
  <tu-space vertical :item-style="{ width: '100%' }">
    <tu-card title="Card 卡片">
      我是内容
    </tu-card>
    <tu-card hoverable>
      <template #header>Card 卡片</template>
      <template #headerExtra>好！</template>
      我是内容
    </tu-card>
  </tu-space>
</template>