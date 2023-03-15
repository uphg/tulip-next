import { defineComponent, h } from 'vue'

export const JustifyContent = defineComponent({
  setup() {
    return () => h('code', [`'start' | 'end' | 'center' | 'baseline' | 'stretch'`])
  }
})

export const FlexWrap = defineComponent({
  setup() {
    return () => h('code', [`'start' | 'end' | 'center' | 'baseline' | 'stretch'`])
  }
})
