<template>
  <div class="space">
    <t-input-group>
      <t-input-group-label>￥</t-input-group-label>
      <t-input v-model:value="value" placeholder="请输入内容" />
    </t-input-group>
    <t-input-group>
      <t-input v-model:value="value" placeholder="请输入内容" />
      <t-input-group-label>元</t-input-group-label>
    </t-input-group>
    <t-input-group>
      <t-input-group-label>http://</t-input-group-label>
      <t-input v-model:value="value" placeholder="请输入内容" />
      <t-input-group-label>.com</t-input-group-label>
    </t-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
