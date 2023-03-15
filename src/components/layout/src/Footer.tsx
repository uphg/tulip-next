import { defineComponent, h } from 'vue'
import { footerProps } from './props'
import { useLayoutStyle } from './useLayout'

const Footer = defineComponent({
  name: 'TuFooter',
  props: footerProps,
  setup(props, context) {
    const style = useLayoutStyle(props)

    return () => h('div', { class: 'tu-layout-footer', style: style.value },context.slots)
  }
})

export default Footer