<template>
  <button
    class="tulp-switch"
    :class="{ 'tulp-switch--checked': value }"
    @click="toggle"
  >
    <span
      v-if="isWave"
      class="tulp-switch-wave"
      :class="{ active: isWave }"
    />
    <span class="tulp-switch-core"></span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useButtonWave } from "./useButtonWave"

export default defineComponent({
  props: {
    value: Boolean
  },
  setup (props, context) {
    const { isWave, triggerWave } = useButtonWave()
    const toggle = () => {
      triggerWave()
      context.emit('update:value', !props.value)
    }

    return { toggle, isWave }
  }
})
</script>
<style lang="scss">
@import 'style/switch';
</style>