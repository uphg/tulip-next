// import '../../_styles/components/tabs.styl'
import { defineComponent, ref, computed, onMounted, watchEffect, nextTick } from 'vue';
import { getRect, addClass } from '../../../utils';
import type { PropType } from 'vue'
// ComponentPublicInstance<HTMLInputElement>

interface TTabsTabItem {
  label: string | number | boolean,
  name: string | number | boolean
}

export default defineComponent({
  props: {
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>
    },
    type: {
      type: [String] as PropType<'default' | 'segment'>,
      default: 'default'
    }
  },
  emits: ['update:value'],
  setup(props, context) {
    const slots = context.slots
    const navRef = ref<HTMLElement | null>(null)
    const barRef = ref<HTMLElement | null>(null)
    const selectRef = ref<HTMLElement | null>(null)

    const content = computed(() => slots.default?.().find((item) => {
      return item.props?.name === props.value
    }))

    const titles = computed<TTabsTabItem[] | undefined>(() => {
      return slots.default?.().map((item) => {
        const { label, name } = item.props || {}
        return { label, name }
      })
    })

    const handleTabClick = (item: TTabsTabItem) => {
      context.emit('update:value', item.name)
    }

    const updateBar = () => {
      const width = getRect(selectRef.value, 'width')
      const navLeft = getRect(navRef.value, 'left')
      const selectLeft = getRect(selectRef.value, 'left')
      const left = selectLeft - navLeft
      const bar = barRef.value
      if (bar) {
        bar.style.width = width + 'px'
        bar.style.left = left + 'px'
      }
    }

    const initTransitionBar = () => {
      const bar = barRef.value
      // 强制更新一次 DOM
      void bar?.offsetHeight
      nextTick(() => {
        bar && addClass(bar, 'tu-tabs__active-bar--transition')
      })
    }

    props.type === 'default' && onMounted(() => {
      nextTick(() => {
        watchEffect(updateBar)
        initTransitionBar()
      })
    })

    return () => (
      <div class="tu-tabs">
        <div
          ref={navRef}
          class={
            [
              'tu-tabs-nav',
              props.type === 'segment' && 'tu-tabs-nav--segment'
            ]
          }
        >
          {titles.value?.map((item) => (
            <div
              ref={(el) => {
                if (item.name === props.value) {
                  selectRef.value = el as HTMLElement
                }
              }}
              class={[
                'tu-tabs-tab',
                item.name === props.value && 'tu-tabs-tab--active'
              ]}
              onClick={() => handleTabClick(item)}
            >
              <span
                class="tu-tabs-tab__label"
              >{item.label}</span>
            </div>
          ))}
          {props.type === 'default' && <div ref={barRef} class={'tu-tabs__active-bar'}></div>}
        </div>
        {content.value}
      </div>
    )
  }
})