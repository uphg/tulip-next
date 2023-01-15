import { useMutationObserver } from '../../../composables/useMutationObserver'
import { computed, defineComponent, onMounted, ref, shallowRef, type PropType } from 'vue'

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

    const scrollTop = ref(0)
    const scrollLeft = ref(0)
    const railScrollTop = ref(0)
    const railScrollLeft = ref(0)
    const yBarSize = ref(0)
    const xBarSize = ref(0)

    const yBarHidden = computed(() => yBarSize.value >= Number(railY.value?.offsetHeight))
    const xBarHidden = computed(() => xBarSize.value >= Number(railX.value?.offsetWidth))

    function handleScroll() {
      updateScrollbar()
    }

    // --- Y 轴
    let memoYTop = 0
    let memoMouseY = 0
    let yBarPressed = false

    function setRailScrollTop() {
      const railYHeight = Number(railY.value?.offsetHeight)
      const contentHeight = Number(content.value?.offsetHeight)
      const containerHeight = Number(container.value?.offsetHeight)
      if (contentHeight === null || containerHeight === null || railYHeight === null) {
        railScrollTop.value = 0
        return
      }
      const heightDiff = contentHeight! - containerHeight
      const barHeight = Number(railYBar.value?.offsetHeight)
      railScrollTop.value = (scrollTop.value * (railYHeight - barHeight)) / heightDiff
    }

    function setYBarSize() {
      const contentHeight = Number(content.value?.offsetHeight)
      const containerHeight = Number(container.value?.offsetHeight)
      const railYHeight = Number(railY.value?.offsetHeight)
      if (contentHeight === 0 || containerHeight === 0) {
        yBarSize.value = 0
        return
      }
      // Old: (containerHeight / contentHeight) * railYHeight
      yBarSize.value = Math.min(railYHeight, (containerHeight! * railYHeight) / contentHeight)
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

      const contentHeight = Number(content.value?.offsetHeight)
      const containerHeight = Number(container.value?.offsetHeight)

      const moveSize = e.clientY - memoMouseY
      const top = moveSize * (
          contentHeight - containerHeight
        ) / (
          Number(railY.value?.offsetHeight) - Number(railYBar.value?.offsetHeight)
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
      const railXWidth = Number(railX.value?.offsetWidth)
      const contentWidth = Number(content.value?.offsetWidth)
      const containerWidth = Number(container.value?.offsetWidth)
      if (contentWidth === null || containerWidth === null || railXWidth === null) {
        railScrollLeft.value = 0
        return
      }
      const widthDiff = contentWidth - containerWidth
      const barWidth = railXBar.value?.offsetWidth || 0
      // Old: (scrollLeft / widthDiff) * (railXWidth - barWidth)
      railScrollLeft.value = (scrollLeft.value * (railXWidth - barWidth)) / widthDiff
    }

    function setXBarSize() {
      const railXWidth = Number(railX.value?.offsetWidth)
      const contentWidth = Number(content.value?.offsetWidth)
      const containerWidth = Number(container.value?.offsetWidth)
      if (contentWidth === null || containerWidth === null) {
        xBarSize.value = 0
        return
      }

      // Old: (containerWidth / contentWidth) * railXWidth
      xBarSize.value = Math.min(railXWidth, (containerWidth * railXWidth) / contentWidth)
    }

    function handleXScrollMouseDown(e: MouseEvent) {
      memoXLeft = container.value?.scrollLeft || 0
      memoMouseX = e.clientX
      xBarPressed = true
      window.addEventListener('mousemove', handleXScrollMouseMove)
      window.addEventListener('mouseup', handleXScrollMouseUp)
    }

    function handleXScrollMouseMove(e: MouseEvent) {
      const railXWidth = Number(railX.value?.offsetWidth)
      const railXBarWidth = Number(railXBar.value?.offsetWidth)
      const contentWidth = Number(content.value?.offsetWidth)
      const containerWidth = Number(container.value?.offsetWidth)

      if (!xBarPressed) return
      const moveSize = e.clientX - memoMouseX
      const left = moveSize * (contentWidth - containerWidth) / (railXWidth - railXBarWidth)
      xScrollTo(memoXLeft + left)
    }

    function handleXScrollMouseUp() {
      xBarPressed = false
      window.removeEventListener('mousemove', handleXScrollMouseMove)
      window.removeEventListener('mouseup', handleXScrollMouseUp)
    }

    function updateScrollbar() {
      scrollTop.value = container.value?.scrollTop || 0
      scrollLeft.value = container.value?.scrollLeft || 0
      setRailScrollTop()
      setRailScrollLeft()
      setYBarSize()
      setXBarSize()
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

    onMounted(() => {
      updateScrollbar()
      useMutationObserver(content, () => {
        updateScrollbar()
      }, { attributes: true, childList: true, subtree: true })
    })

    return () => (
      <div class={['tu-scrollbar', { 'tu-scrollbar--direction-x': props.directionX }]}>
        <div ref={container} class={['tu-scrollbar-container']} onScroll={handleScroll}>
          <div ref={content} class="tu-scrollbar-content">{context.slots.default?.()}</div>
        </div>
        <div ref={railY} class="tu-scrollbar-rail tu-scrollbar-rail--vertical">
          <div
            ref={railYBar}
            style={{ top: `${railScrollTop.value}px`, height: `${yBarSize.value}px` }}
            class={['tu-scrollbar-rail__scrollbar', { 'tu-scrollbar-rail__scrollbar--hidden': yBarHidden.value }]}
            onMousedown={handleYScrollMouseDown}
          ></div>
        </div>
        <div ref={railX} class="tu-scrollbar-rail tu-scrollbar-rail--horizontal">
          <div
            ref={railXBar}
            style={{ left: `${railScrollLeft.value}px`, width: `${xBarSize.value}px` }}
            class={['tu-scrollbar-rail__scrollbar', { 'tu-scrollbar-rail__scrollbar--hidden': xBarHidden.value }]}
            onMousedown={handleXScrollMouseDown}
          ></div>
        </div>
      </div>
    )
  }
})

export default Scrollbar
