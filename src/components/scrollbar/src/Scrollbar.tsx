import { computed, defineComponent, ref, shallowRef, type PropType } from 'vue'

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
    const container = shallowRef<HTMLElement | null>(null)
    const content = shallowRef<HTMLElement | null>(null)
    const railY = shallowRef<HTMLElement | null>(null)
    const railX = shallowRef<HTMLElement | null>(null)
    const railYBar = shallowRef<HTMLElement | null>(null)
    const railXBar = shallowRef<HTMLElement | null>(null)
    const railScrollTop = ref(0)
    const railScrollLeft = ref(0)

    // const contentHeight = shallowRef(0)
    // const contentWidth = shallowRef(0)
    // const containerHeight = shallowRef(0)
    // const containerWidth = shallowRef(0)

    const scrollTop = ref(0)
    const scrollLeft = ref(0)

    const containerHeight = computed(() => container.value?.offsetHeight || 0)
    const contentHeight = computed(() => content.value?.offsetHeight || 0)

    const containerWidth = computed(() => container.value?.offsetWidth || 0)
    const contentWidth = computed(() => content.value?.offsetWidth || 0)

    const yBarSize = computed(() => {
      const railYHeight = railY.value?.offsetHeight || 0
      if (contentHeight.value === null || containerHeight.value === null || railYHeight === null) {
        return 0
      } else {
        // 实际计算：(containerHeight.value / contentHeight.value) * railYHeight
        return Math.min(containerHeight.value, (containerHeight.value * railYHeight) / contentHeight.value)
      }
    })
    const yBarSizePx = computed(() => `${yBarSize.value}px`)

    const xBarSize = computed(() => {
      const railXWidth = railX.value?.offsetWidth || 0
      if (contentWidth.value === null || containerWidth.value === null || railXWidth === null) {
        return 0
      } else {
        // 实际计算：(containerWidth.value / contentWidth.value) * railXWidth
        return Math.min(containerWidth.value, (containerWidth.value * railXWidth) / contentWidth.value)
      }
    })
    const xBarSizePx = computed(() => `${xBarSize.value}px`)

    function handleScroll() {
      scrollTop.value = container.value?.scrollTop || 0
      scrollLeft.value = container.value?.scrollLeft || 0
      setRailScrollTop()
      setRailScrollLeft()
    }

    // --- Y 轴
    let memoYTop = 0
    let memoMouseY = 0
    let yBarPressed = false

    function setRailScrollTop() {
      const railYHeight = railY.value?.offsetHeight || 0
      if (contentHeight.value === null || containerHeight.value === null || railYHeight === null) {
        railScrollTop.value = 0
        return
      }
      const heightDiff = contentHeight.value - containerHeight.value
      const barHeight = railYBar.value?.offsetHeight || 0
      railScrollTop.value = (scrollTop.value * (railYHeight - barHeight)) / heightDiff
    }

    function handleYScrollMouseDown(e: MouseEvent) {
      memoYTop = container.value?.scrollTop || 0
      memoMouseY = e.clientY
      yBarPressed = true
      window.addEventListener('mousemove', handleYScrollMouseMove)
      window.addEventListener('mouseup', handleYScrollMouseUp)
    }
    function handleYScrollMouseMove(e: MouseEvent) {
      if (!yBarPressed) return
      const moveSize = e.clientY - memoMouseY
      const top = moveSize * (
          contentHeight.value - containerHeight.value
        ) / (
          railY.value?.offsetHeight - railYBar.value?.offsetHeight
        )
      yScrollTo(memoYTop + top)
    }

    function handleYScrollMouseUp() {
      yBarPressed = false
      window.removeEventListener('mousemove', handleYScrollMouseMove)
      window.removeEventListener('mouseup', handleYScrollMouseUp)
    }

    // --- X 轴
    let memoXLeft = 0
    let memoMouseX = 0
    let xBarPressed = false

    function setRailScrollLeft() {
      const railXWidth = railX.value?.offsetWidth || 0
      if (contentWidth.value === null || containerWidth.value === null || railXWidth === null) {
        railScrollLeft.value = 0
        return
      }
      const widthDiff = contentWidth.value - containerWidth.value
      const barWidth = railXBar.value?.offsetWidth || 0
      // 实际计算：(scrollLeft / widthDiff) * (railXWidth - barWidth)
      railScrollLeft.value = (scrollLeft.value * (railXWidth - barWidth)) / widthDiff
    }

    function handleXScrollMouseDown(e: MouseEvent) {
      memoXLeft = container.value?.scrollLeft || 0
      memoMouseX = e.clientX
      xBarPressed = true
      window.addEventListener('mousemove', handleXScrollMouseMove)
      window.addEventListener('mouseup', handleXScrollMouseUp)
    }

    function handleXScrollMouseMove(e: MouseEvent) {
      if (!xBarPressed) return
      const moveSize = e.clientX - memoMouseX
      const left = moveSize * (
        contentWidth.value - containerWidth.value
      ) / (
        railX.value?.offsetWidth - railXBar.value?.offsetWidth
      )
      xScrollTo(memoXLeft + left)
    }

    function handleXScrollMouseUp() {
      xBarPressed = false
      window.removeEventListener('mousemove', handleXScrollMouseMove)
      window.removeEventListener('mouseup', handleXScrollMouseUp)
    }

    function yScrollTo(y: number) {
      container.value?.scrollTo({
        top: y,
        left: scrollLeft.value
      })
    }

    function xScrollTo(x: number) {
      container.value?.scrollTo({
        top: scrollTop.value,
        left: x
      })
    }

    return () => (
      <div class={['tu-scrollbar', { 'tu-scrollbar--direction-x': props.directionX }]}>
        <div ref={container} class={['tu-scrollbar-container']} onScroll={handleScroll}>
          <div ref={content} class="tu-scrollbar-content">{context.slots.default?.()}</div>
        </div>
        {props.directionY ? (
          <div ref={railY} class="tu-scrollbar-rail tu-scrollbar-rail--vertical">
            <div
              ref={railYBar}
              style={{ top: `${railScrollTop.value}px`, height: yBarSizePx.value }}
              class="tu-scrollbar-rail__scrollbar"
              onMousedown={handleYScrollMouseDown}
            ></div>
          </div>
        ) : null }
        {props.directionX ? (
          <div ref={railX} class="tu-scrollbar-rail tu-scrollbar-rail--horizontal">
            <div
              ref={railXBar}
              style={{ left: `${railScrollLeft.value}px`, width: xBarSizePx.value }}
              class="tu-scrollbar-rail__scrollbar"
              onMousedown={handleXScrollMouseDown}
            ></div>
          </div>
        ) : null}
      </div>
    )
  }
})

export default Scrollbar
