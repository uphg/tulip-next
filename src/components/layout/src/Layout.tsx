import { useNameScope } from '../../../composables/useNameScope'
import { defineComponent, h } from 'vue'
import { layoutProps } from './props'
import { useLayoutStyle } from './useLayout'

const Layout = defineComponent({
  name: 'TuLayout',
  props: layoutProps,
  setup(props, context) {
    const style = useLayoutStyle(props)

    return () => h('div', { class: 'tu-layout', style: style.value },context.slots)
  }
})

export default Layout