import { defineComponent, ref, watchEffect, type PropType, type SetupContext, type VNode } from 'vue'
import { renderComponent, setStyle } from '../../../utils'

const tabsProps = {
  value: {
    type: [String, Number, Boolean, Symbol(), null] as PropType<string | number | boolean | symbol | null>,
    default: void 0
  },
  type: {
    type: [String] as PropType<'default' | 'segment'>,
    default: 'default'
  }
}

const Tabs = defineComponent({
  name: 'TuTabs',
  props: tabsProps,
  setup(props, context: SetupContext<{}>) {
    const { slots } = context
    const bar = ref<HTMLElement | null>(null)
    const checked = ref<HTMLElement | null>(null)
    const tabWrap = ref<HTMLElement | null>(null)

    const handleTabClick = (item: VNode) => {
      context.emit('update:value', item.props?.name)
    }

    const updateBar = () => {
      if (!bar.value) return

      const { left, width } = checked.value?.getBoundingClientRect()! || {}
      const { left: wrapLeft } = tabWrap.value?.getBoundingClientRect()! || {}

      setStyle(bar.value, { width: width + 'px', left: left - wrapLeft + 'px' })
    }

    watchEffect(updateBar)

    return () => {
      const tabPanes = renderComponent(slots.default?.(), 'TabPane')
      return (
        <div class="tu-tabs">
          <div class={['tu-tabs-nav', { 'tu-tabs-nav--segment': props.type === 'segment' }]}>
            {slots.prefix && <div class="tu-tabs-nav__prefix">{slots.prefix()}</div>}
            <div class={['tu-tabs-nav__wrap']}>
              <div ref={tabWrap} class="tu-tabs-tab__wrap">
                {tabPanes.map((item, index) => (
                  <div
                    ref={(el) => {
                      if (item.props?.name === props.value) {
                        checked.value = el as HTMLElement
                      }
                    }}
                    class={['tu-tabs-tab__item', { active: item.props?.name === props.value }]}
                    key={index}
                    onClick={() => handleTabClick(item)}
                  ><span class="tu-tabs-tab__item-label">{item.props?.label}</span></div>
                ))}
              </div>
              {props.type === 'default' && <div ref={bar} class="tu-tabs-bar"></div>}
            </div>
            {slots.suffix && <div class="tu-tabs-nav__suffix">{slots.suffix()}</div>}
          </div>
          <div class={['tu-tabs-content', { 'tu-tabs-content--segment': props.type === 'segment' }]}>
            {tabPanes.find((item) => item.props?.name === props.value)}
          </div>
        </div>
      )
    }
  }
})

export default Tabs