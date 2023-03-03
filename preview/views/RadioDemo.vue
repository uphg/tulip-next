<template>

  <input type="radio" />
  <h2>Radio</h2>
  <div>
    <tu-radio :checked="value === '1'" value="1" @change="handleChange">标签1</tu-radio>
    <tu-radio :checked="value === '2'" value="2" @change="handleChange"/>
    <tu-radio :checked="value === '3'" value="3" @change="handleChange" disabled>禁用</tu-radio>
  </div>

  <h2>Radio 组</h2>
  <div>
    <tu-radio-group v-model:value="value2" name="radiogroup">
      <tu-space>
        <tu-radio v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </tu-radio>
      </tu-space>
    </tu-radio-group>
  </div>

  <h2>RadioButton 按钮组</h2>
  <div>
    <tu-radio-group v-model:value="value3">
      <tu-radio-button v-for="option in options" :key="option.value" :value="option.value" :disabled="option.value > 0 && option.value < 4">
        {{ option.label }}
      </tu-radio-button>
    </tu-radio-group>
    <hr>
    <tu-radio-group v-model:value="value3">
      <tu-radio-button v-for="option in options" :key="option.value" :value="option.value" :disabled="option.value === 0">
        {{ option.label }}
      </tu-radio-button>
    </tu-radio-group>
    <hr>
    <tu-radio-group v-model:value="value3">
      <tu-radio-button v-for="option in options" :key="option.value" :value="option.value" :disabled="option.value === 4">
        {{ option.label }}
      </tu-radio-button>
    </tu-radio-group>
    <hr>
    <tu-radio-group v-model:value="value3" filling>
      <tu-radio-button v-for="option in options" :key="option.value" :value="option.value" :disabled="option.value === 4">
        {{ option.label }}
      </tu-radio-button>
    </tu-radio-group>
    <hr>
    <tu-radio-group v-model:value="value3" filling>
      <tu-radio-button v-for="option in options" :key="option.value" :value="option.value" :disabled="option.value === 0 || option.value === 2">
        {{ option.label }}
      </tu-radio-button>
    </tu-radio-group>
  </div>
  <tu-button @click="onClickButton">下一个</tu-button>
  <h2>聚焦</h2>
  <div>
    <tu-space item-style="display: flex;">
      <tu-radio ref="radio" label="选项1"/>
      <tu-button size="small" @click="onClick">聚焦 1 秒后取消</tu-button>
    </tu-space>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const radio = shallowRef(null)
const value = ref('3')
const value2 = ref(2)
const value3 = ref<number | null>(null)
const value4 = ref(2)
const value5 = ref(0)

function onClick() {
  radio.value.focus()
  setTimeout(() => {
    radio.value.blur()
  }, 1000)
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  value.value = target.value
}

function onClickButton() {
  if(value3.value === null) {
    value3.value = 0
    return
  }
  if (value3.value >= 4) {
    value3.value = 0
    return
  }
  value3.value +=1
}

const options = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'].map((item, index) => ({ label: item, value: index })))
</script>

<style>

</style>