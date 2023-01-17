import { computed, defineComponent, onBeforeUnmount, onMounted, ref, shallowRef, type PropType } from 'vue'
import { toPx, withAttrs } from '../../../utils'
import { useMutationObserver, type useMutationObserverReturn } from '../../../composables/useMutationObserver'

const scrollbarProps = {
  onScroll: Function as PropType<(e: Event) => void>
}

const Scrollbar = defineComponent({
  name: 'TuScrollbar',
  props: scrollbarProps,
  setup(props, context) {
    const container = shallowRef<HTMLElement | null>(null)
    const content = shallowRef<HTMLElement | null>(null)
    const trackY = shallowRef<HTMLElement | null>(null)
    const trackX = shallowRef<HTMLElement | null>(null)
    const trackYBar = shallowRef<HTMLElement | null>(null)
    const trackXBar = shallowRef<HTMLElement | null>(null)

    const containerScrollTop = ref(0)
    const containerScrollLeft = ref(0)
    const trackScrollTop = ref(0)
    const trackScrollLeft = ref(0)
    const trackYBarSize = ref(0)
    const trackXBarSize = ref(0)
    const contentListener = ref<useMutationObserverReturn | null>(null)

    let memoYTop = 0
    let memoXLeft = 0
    let memoMouseY = 0
    let memoMouseX = 0
    let xBarPressed = false
    let yBarPressed = false

    const trackYBarHidden = computed(() => trackYBarSize.value >= withAttrs(trackY.value).offsetHeight)
    const trackXBarHidden = computed(() => trackXBarSize.value >= withAttrs(trackX.value).offsetWidth)

    function handleScroll(e: Event) {
      props.onScroll?.(e)
      updateScrollState()
      updateTrackYScrollTop()
      updateTrackXScrollLeft()
    }

    function updateScrollState() {
      containerScrollTop.value = container.value?.scrollTop || 0
      containerScrollLeft.value = container.value?.scrollLeft || 0
    }

    function updateBarSize() {
      updateYBarSize()
      updateXBarSize()
    }

    function updateYBarSize() {
      const { offsetHeight: contentHeight } = withAttrs(content.value)
      const { offsetHeight: containerHeight } = withAttrs(container.value)
      const { offsetHeight: trackYHeight } = withAttrs(trackY.value)
      if (contentHeight === 0 || containerHeight === 0) {
        trackYBarSize.value = 0
        return
      }
      // Old: (containerHeight / contentHeight) * trackYHeight
      const newBarSize = Math.min(trackYHeight, (containerHeight! * trackYHeight) / contentHeight)
      trackYBarSize.value = newBarSize
    }

    function updateTrackYScrollTop() {
      const { offsetHeight: contentHeight } = withAttrs(content.value)
      const { offsetHeight: containerHeight } = withAttrs(container.value)
      if (contentHeight === 0 || containerHeight === 0) {
        trackScrollTop.value = 0
        return
      }

      const { offsetHeight: trackYHeight } = withAttrs(trackY.value)
      const { offsetHeight: barHeight } = withAttrs(trackYBar.value)
      const heightDiff = contentHeight! - containerHeight
      const rawRailScrollTop = (containerScrollTop.value / heightDiff) * (trackYHeight - barHeight)
      const newBarHeight = containerHeight / contentHeight * trackYHeight
      const trackYUpperBound = trackYHeight - newBarHeight

      // 修复滚动条滚动距离过大的 bug
      trackScrollTop.value = rawRailScrollTop > trackYUpperBound
        ? trackYUpperBound
        : rawRailScrollTop < 0
          ? 0
          : rawRailScrollTop
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

      const { offsetHeight: trackYHeight } = withAttrs(trackY.value)
      const { offsetHeight: trackYBarHeight } = withAttrs(trackYBar.value)
      const { offsetHeight: contentHeight } = withAttrs(content.value)
      const { offsetHeight: containerHeight } = withAttrs(container.value)

      const moveSize = e.clientY - memoMouseY
      const top = moveSize * (contentHeight - containerHeight) / (trackYHeight - trackYBarHeight)

      const scrollTopUpperBound = contentHeight - containerHeight
      const rawScrollTop = memoYTop + top
      const scrollTop = rawScrollTop < 0
        ? 0
        : rawScrollTop > scrollTopUpperBound
          ? scrollTopUpperBound
          : rawScrollTop

      scrollToTop(scrollTop)
    }

    function handleYScrollMouseUp() {
      yBarPressed = false
      window.removeEventListener('mousemove', handleYScrollMouseMove)
      window.removeEventListener('mouseup', handleYScrollMouseUp)
    }

    function updateXBarSize() {
      const { offsetWidth: trackXWidth } = withAttrs(trackX.value)
      const { offsetWidth: contentWidth } = withAttrs(content.value)
      const { offsetWidth: containerWidth } = withAttrs(container.value)
      if (contentWidth === 0 || containerWidth === 0) {
        trackXBarSize.value = 0
        return
      }

      // Old: (containerWidth / contentWidth) * trackXWidth
      trackXBarSize.value = Math.min(trackXWidth, (containerWidth * trackXWidth) / contentWidth)
    }

    function updateTrackXScrollLeft() {
      const contentWidth = Number(content.value?.offsetWidth)
      const containerWidth = Number(container.value?.offsetWidth)
      if (contentWidth === 0 || containerWidth === 0) {
        trackScrollLeft.value = 0
        return
      }
      const trackXWidth = Number(trackX.value?.offsetWidth)
      const barWidth = Number(trackXBar.value?.offsetWidth)
      const widthDiff = contentWidth - containerWidth
      const rawRailScrollLeft = (containerScrollLeft.value / widthDiff) * (trackXWidth - barWidth)
      const newBarWidth = containerWidth / contentWidth * trackXWidth
      const trackXUpperBound = trackXWidth - newBarWidth

      // 修复滚动条滚动距离过大的 bug
      trackScrollLeft.value = rawRailScrollLeft > trackXUpperBound
        ? trackXUpperBound
        : rawRailScrollLeft < 0
          ? 0
          : rawRailScrollLeft
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
      const { offsetWidth: trackXWidth } = withAttrs(trackX.value)
      const { offsetWidth: trackXBarWidth } = withAttrs(trackXBar.value)
      const { offsetWidth: contentWidth } = withAttrs(content.value)
      const { offsetWidth: containerWidth } = withAttrs(container.value)

      const moveSize = e.clientX - memoMouseX
      const left = moveSize * (contentWidth - containerWidth) / (trackXWidth - trackXBarWidth)

      const rawScrollLeft = memoXLeft + left
      const scrollLeftUpperBound = contentWidth - containerWidth
      const scrollLeft = rawScrollLeft < 0
        ? 0
        : rawScrollLeft > scrollLeftUpperBound
          ? scrollLeftUpperBound
          : rawScrollLeft

      scrollToLeft(scrollLeft)
    }

    function handleXScrollMouseUp() {
      xBarPressed = false
      window.removeEventListener('mousemove', handleXScrollMouseMove)
      window.removeEventListener('mouseup', handleXScrollMouseUp)
    }

    function scrollToTop(top: number) {
      scrollTo({ top, left: containerScrollLeft.value })
    }

    function scrollToLeft(left: number) {
      scrollTo({ top: containerScrollTop.value, left })
    }

    function scrollTo(options?: ScrollToOptions) {
      container.value?.scrollTo(options)
    }

    function scrollBy(options?: ScrollToOptions) {
      container.value?.scrollBy(options)
    }

    function update() {
      updateScrollState()
      updateTrackYScrollTop()
      updateTrackXScrollLeft()
      updateBarSize()
    }

    onMounted(() => {
      updateBarSize()
      contentListener.value = useMutationObserver(content, () => {
        updateBarSize()
      }, { attributes: true, childList: true, subtree: true })
    })

    onBeforeUnmount(() => {
      contentListener.value?.stop()
      if (yBarPressed) {
        window.removeEventListener('mousemove', handleYScrollMouseMove)
        window.removeEventListener('mouseup', handleYScrollMouseUp)
      }
      if (xBarPressed) {
        window.removeEventListener('mousemove', handleXScrollMouseMove)
        window.removeEventListener('mouseup', handleXScrollMouseUp)
      }
    })

    context.expose({
      update,
      scrollTo,
      scrollBy
    })

    return () => (
      <div class={'tu-scrollbar'}>
        <div ref={container} class={['tu-scrollbar-container']} onScroll={handleScroll}>
          <div ref={content} class="tu-scrollbar-content">{context.slots.default?.()}</div>
        </div>
        <div ref={trackY} class="tu-scrollbar-track tu-scrollbar-track--vertical">
          <div
            ref={trackYBar}
            style={{ top: toPx(trackScrollTop.value), height: toPx(trackYBarSize.value) }}
            class={['tu-scrollbar-track__scrollbar', { 'tu-scrollbar-track__scrollbar--hidden': trackYBarHidden.value }]}
            onMousedown={handleYScrollMouseDown}
          ></div>
        </div>
        <div ref={trackX} class="tu-scrollbar-track tu-scrollbar-track--horizontal">
          <div
            ref={trackXBar}
            style={{ left: toPx(trackScrollLeft.value), width: toPx(trackXBarSize.value) }}
            class={['tu-scrollbar-track__scrollbar', { 'tu-scrollbar-track__scrollbar--hidden': trackXBarHidden.value }]}
            onMousedown={handleXScrollMouseDown}
          ></div>
        </div>
      </div>
    )
  }
})

export default Scrollbar
