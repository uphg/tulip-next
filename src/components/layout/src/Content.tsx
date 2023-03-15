import { defineComponent, h } from 'vue'
import { contentProps } from './props'
import { useLayoutStyle } from './useLayout'

const Content = defineComponent({
  name: 'TuContent',
  props: contentProps,
  setup(props, context) {
    const style = useLayoutStyle(props)

    return () => h('div', { class: 'tu-layout-content', style: style.value },context.slots)
  }
})

export default Content