import { computed, defineComponent, ref, type PropType } from 'vue'

const scrollbarProps = {
  directionY: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  directionX: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

const Scrollbar = defineComponent({
  name: 'TuScrollbar',
  props: scrollbarProps,
  setup(props, context) {

    const containerRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const railYRef = ref<HTMLElement | null>(null)
    const railXRef = ref<HTMLElement | null>(null)
    const railYBarRef = ref<HTMLElement | null>(null)
    const railXBarRef = ref<HTMLElement | null>(null)

    const scrollTopRef = ref(0)
    const scrollLeftRef = ref(0)

    const containerHeight = computed(() => containerRef.value?.offsetHeight || 0)
    const contentHeight = computed(() => contentRef.value?.offsetHeight || 0)
    const railScrollTopRef = computed(() => {
      const railYHeight = railYRef.value?.offsetHeight || 0
      if (contentHeight.value === null || containerHeight.value === null || railYHeight === null) {
        return 0
      } else {
        const scrollTop = scrollTopRef.value
        const heightDiff = contentHeight.value - containerHeight.value
        const barHeight = railYBarRef.value?.offsetHeight || 0
        // 实际计算：(scrollTop / heightDiff) * (railYHeight - barHeight)
        return (scrollTop * (railYHeight - barHeight)) / heightDiff
      }
    })
    const railScrollTopPx = computed(() => `${railScrollTopRef.value}px`)

    const yBarSize = computed(() => {
      const railYHeight = railYRef.value?.offsetHeight || 0
      if (contentHeight.value === null || containerHeight.value === null || railYHeight === null) {
        return 0
      } else {
        console.log(railYHeight)
        // 实际计算：(containerHeight.value / contentHeight.value) * railYHeight
        return Math.min(containerHeight.value, (containerHeight.value * railYHeight) / contentHeight.value)
      }
    })
    const yBarSizePx = computed(() => `${yBarSize.value}px`)

    const handleScroll = (e: Event) => {
      scrollTopRef.value = containerRef.value.scrollTop
    }

    return () => (
      <div class={['tu-scrollbar', { 'tu-scrollbar--direction-x': props.directionX }]}>
        <div ref={containerRef} class={['tu-scrollbar-container', context.attrs.class]} onScroll={handleScroll}>
          <div ref={contentRef} class="tu-scrollbar-content">{context.slots.default?.()}</div>
        </div>
        {props.directionY ? (
          <div ref={railYRef} class="tu-scrollbar-rail tu-scrollbar-rail--vertical">
            <div
              ref={railYBarRef}
              style={{ top: railScrollTopPx.value, height: yBarSizePx.value }}
              class="tu-scrollbar-rail__scrollbar"
            ></div>
          </div>
        ) : null }
        {props.directionX ? (
          <div ref={railXRef} class="tu-scrollbar-rail tu-scrollbar-rail--horizontal">
            <div style={{ width: 100 }} class="tu-scrollbar-rail__scrollbar"></div>
          </div>
        ) : null}
      </div>
    )
  }
})

export default Scrollbar


// container 100

// content 1000

// rail 30

// raiBar ?

// 第一种：(100 / 1000) * 30
// 第二种：100 * 30 / 1000

// container content raill railBar
//         1       1     1       ?
//         2       2     2
//         3       3    
//         4       4    
//         5       5    
//                 6    
//                 7    
//                 8    
//                 9    
//                10    
//                11    
//                12    
//                13    
//                14    
//                15    