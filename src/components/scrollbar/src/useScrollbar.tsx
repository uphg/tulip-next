import { computed, onBeforeUnmount, onMounted, ref, Transition, vShow, withDirectives, type SetupContext } from 'vue'
import type { ScrollbarProps } from './scrollbarProps'
import { toPx, withAttrs, on, off } from '../../../utils'
import { useResizeObserver, type UseResizeObserverReturn } from '../../../composables/useResizeObserver'

export function useScrollbar(props: ScrollbarProps, context: SetupContext) {
  const container = ref<HTMLElement | null>(null)
  const content = ref<HTMLElement | null>(null)
  const trackY = ref<HTMLElement | null>(null)
  const trackX = ref<HTMLElement | null>(null)

  const containerScrollTop = ref(0)
  const containerScrollLeft = ref(0)
  const trackScrollTop = ref(0)
  const trackScrollLeft = ref(0)
  const trackYBarSize = ref(0)
  const trackXBarSize = ref(0)

  const contentListener = ref<UseResizeObserverReturn | null>(null)
  const hover = ref(false)
  const xBarPressed = ref(false)
  const yBarPressed = ref(false)
  
  let memoYTop = 0
  let memoXLeft = 0
  let memoMouseY = 0
  let memoMouseX = 0
  
  const triggerisNont = computed(() => props.trigger === 'none')
  const trackYBarHidden = computed(() => trackYBarSize.value >= withAttrs(trackY.value).offsetHeight)
  const trackXBarHidden = computed(() => trackXBarSize.value >= withAttrs(trackX.value).offsetWidth)

  function handleScroll(e: Event) {
    props.onScroll?.(e)
    updateScrollStatus()
    updateTrackYScrollTop()
    updateTrackXScrollLeft()
  }

  function updateScrollStatus() {
    containerScrollTop.value = container.value?.scrollTop ?? 0
    containerScrollLeft.value = container.value?.scrollLeft ?? 0
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
    const newBarSize = Math.min(trackYHeight, (containerHeight * trackYHeight) / contentHeight)
    trackYBarSize.value = newBarSize
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

  function updateTrackYScrollTop() {
    const { offsetHeight: contentHeight } = withAttrs(content.value)
    const { offsetHeight: containerHeight } = withAttrs(container.value)
    if (contentHeight === 0 || containerHeight === 0) {
      trackScrollTop.value = 0
      return
    }

    const { offsetHeight: trackYHeight } = withAttrs(trackY.value)
    const heightDiff = contentHeight! - containerHeight
    const rawRailScrollTop = (containerScrollTop.value / heightDiff) * (trackYHeight - trackYBarSize.value)
    const newYBarHeight = containerHeight / contentHeight * trackYHeight
    const trackYUpperBound = trackYHeight - newYBarHeight

    // 修复滚动条滚动距离过大的 bug
    trackScrollTop.value = Math.max(0, rawRailScrollTop > trackYUpperBound
      ? trackYUpperBound
      : rawRailScrollTop)
  }

  function handleYScrollMouseDown(e: MouseEvent) {
    memoYTop = container.value?.scrollTop || 0
    memoMouseY = e.clientY
    yBarPressed.value = true
    on(document, 'mousemove', handleYScrollMouseMove)
    on(document, 'mouseup', handleYScrollMouseUp)
  }

  function handleYScrollMouseMove(e: MouseEvent) {
    if (!yBarPressed.value) return

    const { offsetHeight: trackYHeight } = withAttrs(trackY.value)
    const { offsetHeight: contentHeight } = withAttrs(content.value)
    const { offsetHeight: containerHeight } = withAttrs(container.value)

    const moveSize = e.clientY - memoMouseY
    const top = moveSize * (contentHeight - containerHeight) / (trackYHeight - trackYBarSize.value)

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
    yBarPressed.value = false

    off(document, 'mousemove', handleYScrollMouseMove)
    off(document, 'mouseup', handleYScrollMouseUp)
  }

  function updateTrackXScrollLeft() {
    const { offsetWidth: contentWidth } = withAttrs(content.value)
    const { offsetWidth: containerWidth } = withAttrs(container.value)
    if (contentWidth === 0 || containerWidth === 0) {
      trackScrollLeft.value = 0
      return
    }
    const { offsetWidth: trackXWidth } = withAttrs(trackX.value)
    const widthDiff = contentWidth - containerWidth
    const rawRailScrollLeft = (containerScrollLeft.value / widthDiff) * (trackXWidth - trackXBarSize.value)
    const newXBarWidth = containerWidth / contentWidth * trackXWidth
    const trackXUpperBound = trackXWidth - newXBarWidth

    // 修复滚动条滚动距离过大的 bug
    trackScrollLeft.value = Math.max(0, rawRailScrollLeft > trackXUpperBound
      ? trackXUpperBound
      : rawRailScrollLeft)
  }

  function handleXScrollMouseDown(e: MouseEvent) {
    memoXLeft = container.value?.scrollLeft ?? 0
    memoMouseX = e.clientX
    xBarPressed.value = true
    on(document, 'mousemove', handleXScrollMouseMove)
    on(document, 'mouseup', handleXScrollMouseUp)
  }

  function handleXScrollMouseMove(e: MouseEvent) {
    if (!xBarPressed.value) return
    const { offsetWidth: trackXWidth } = withAttrs(trackX.value)
    const { offsetWidth: contentWidth } = withAttrs(content.value)
    const { offsetWidth: containerWidth } = withAttrs(container.value)

    const moveSize = e.clientX - memoMouseX
    const left = moveSize * (contentWidth - containerWidth) / (trackXWidth - trackXBarSize.value)

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
    xBarPressed.value = false

    off(document, 'mousemove', handleXScrollMouseMove)
    off(document, 'mouseup', handleXScrollMouseUp)
  }

  function handleMouseEnter() {
    hover.value = true
  }

  function handleMouseLeave() {
    hover.value = false
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
    updateScrollStatus()
    updateTrackYScrollTop()
    updateTrackXScrollLeft()
    updateBarSize()
  }

  context.expose({ update, scrollTo, scrollBy })

  onMounted(() => {
    updateBarSize()
    contentListener.value = useResizeObserver(content, () => {
      update()
    })
  })

  onBeforeUnmount(() => {
    contentListener.value?.stop()
    if (yBarPressed.value) {
      off(document, 'mousemove', handleYScrollMouseMove)
      off(document, 'mouseup', handleYScrollMouseUp)
    }
    if (xBarPressed.value) {
      off(document, 'mousemove', handleXScrollMouseMove)
      off(document, 'mouseup', handleXScrollMouseUp)
    }
  })

  return () => {
    const YBar = (
      <div
        style={{ top: toPx(trackScrollTop.value), height: toPx(trackYBarSize.value) }}
        class={['tu-scrollbar-track__scrollbar', {
          'tu-scrollbar-track__scrollbar--hidden': trackYBarHidden.value
        }]}
        onMousedown={handleYScrollMouseDown}
      ></div>
    )

    const XBar = (
      <div
        style={{ left: toPx(trackScrollLeft.value), width: toPx(trackXBarSize.value) }}
        class={['tu-scrollbar-track__scrollbar', {
          'tu-scrollbar-track__scrollbar--hidden': trackXBarHidden.value
        }]}
        onMousedown={handleXScrollMouseDown}
      ></div>
    )

    return (
      <div class={['tu-scrollbar', { 'tu-scrollbar--large': props.size === 'large' }]} onMouseenter={handleMouseEnter} onMouseleave={handleMouseLeave}>
        <div ref={container} class={['tu-scrollbar-container']} onScroll={handleScroll}>
          <div ref={content} class="tu-scrollbar-content">{context.slots.default?.()}</div>
        </div>
        <div ref={trackY} class="tu-scrollbar-track tu-scrollbar-track--vertical">
          {triggerisNont.value ? YBar : (
            <Transition name="tu-fade">
              {withDirectives(YBar, [[vShow, hover.value || yBarPressed.value]])}
            </Transition>
          )}
        </div>
        <div ref={trackX} class="tu-scrollbar-track tu-scrollbar-track--horizontal">
          {triggerisNont.value ? XBar : <Transition name="tu-fade">
            {withDirectives(XBar, [[vShow, hover.value || xBarPressed.value]])}
          </Transition>}
        </div>
      </div>
    )
  }
}