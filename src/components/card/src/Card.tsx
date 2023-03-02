import { defineComponent, type PropType } from 'vue'
import { useNameScope } from '../../../composables/useNameScope'

const Card = defineComponent({
  name: 'TuCard',
  props: {
    title: String as PropType<string>,
    bordered: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    hoverable: Boolean as PropType<boolean>,
    headerStyle: [String, Object] as PropType<string | Record<string, string>>,
    contentStyle: [String, Object] as PropType<string | Record<string, string>>,
    footerStyle: [String, Object] as PropType<string | Record<string, string>>,
  },
  setup(props, context) {
    const ns = useNameScope('card')
    return () => {
      const { slots } = context
      const headerExtra = slots['header-extra'] || slots.headerExtra
      const { title, bordered, hoverable, headerStyle, contentStyle, footerStyle } = props

      return (
        <div
          class={[ns.base, {
            [ns.is('bordered')]: bordered,
            [ns.is('hoverable')]: hoverable
          }]}
        >
          {slots.header || title ? (
            <div class={ns.el('header')} style={headerStyle}>
              <div class={ns.el('header-wrap')}>
                <div class={ns.el('header-main')}>
                  {slots.header ? slots.header() : title}
                </div>
                {headerExtra ? (
                  <div class={ns.el('header-extra')}>
                    {headerExtra()}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          <div class={ns.el('content')} style={contentStyle}>
            {slots.default?.()}
          </div>
          {slots.footer ? (
            <div class={ns.el('footer')} style={footerStyle}>
              {slots.footer()}
            </div>
          ) : null}
        </div>
      )
    }
  }
})

export default Card
