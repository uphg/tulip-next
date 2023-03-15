import { defineComponent, h } from 'vue'
import { headerProps } from './props'
import { useLayoutStyle } from './useLayout'

const Header = defineComponent({
  name: 'TuHeader',
  props: headerProps,
  setup(props, context) {
    const style = useLayoutStyle(props)

    return () => h('div', { class: 'tu-layout-header', style: style.value },context.slots)
  }
})

export default Header