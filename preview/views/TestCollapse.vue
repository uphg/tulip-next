<template>
  <div style="padding: 20px 24px; border: 1px solid #cacdd1;">
    <tu-collapse>
      <tu-collapse-item title="三国演义" :name="1">桃园三结义</tu-collapse-item>
      <tu-collapse-item title="西游记" :name="2">大闹天宫</tu-collapse-item>
      <tu-collapse-item title="水浒传" :name="3">武松打虎</tu-collapse-item>
    </tu-collapse>
    <h2>手风琴模式</h2>
    <tu-collapse accordion>
      <tu-collapse-item title="三国演义" :name="1">桃园三结义</tu-collapse-item>
      <tu-collapse-item title="西游记" :name="2">大闹天宫</tu-collapse-item>
      <tu-collapse-item title="水浒传" :name="3">武松打虎</tu-collapse-item>
    </tu-collapse>
  </div>
</template>