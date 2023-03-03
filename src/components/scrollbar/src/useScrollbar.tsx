import { computed, onBeforeUnmount, onMounted, ref, shallowRef, Transition, vShow, withDirectives, type SetupContext } from 'vue'
import type { ScrollbarProps } from './props'
import { toPx, on, off } from '../../../utils'
import { useResizeObserver, type UseResizeObserverReturn } from '../../../composables/useResizeObserver'

export function useScrollbar(props: ScrollbarProps, context: SetupContext) {
  const container = shallowRef<HTMLElement | null>(null)
  const content = shallowRef<HTMLElement | null>(null)
  const yTrack = shallowRef<HTMLElement | null>(null)
  const xTrack = shallowRef<HTMLElement | null>(null)

  const containerScrollTop = ref(0)
  const containerScrollLeft = ref(0)
  const yTrackScrollTop = ref(0)
  const xTrackScrollLeft = ref(0)
  const yTrackBarSize = ref(0)
  const xTrackBarSize = ref(0)

  const hover = ref(false)
  const xBarPressed = ref(false)
  const yBarPressed = ref(false)
  const contentResizeObserver = ref<UseResizeObserverReturn | null>(null)
  
  let yTop = 0
  let xLeft = 0
  let mouseY = 0
  let mouseX = 0
  
  // always show scrollbar
  const triggerisNont = computed(() => props.trigger === 'none')
  const yTrackBarHidden = computed(() => yTrackBarSize.value >= (yTrack.value?.offsetHeight || 0))
  const xTrackBarHidden = computed(() => xTrackBarSize.value >= (xTrack.value?.offsetWidth || 0))

  function handleScroll(e: Event) {
    updateScrollStatus()
    updateYTrackScrollTop()
    updateXTrackScrollLeft()
    props.onScroll?.(e)
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
    if (!content.value || !container.value || !yTrack.value) {
      yTrackBarSize.value = 0
      return 
    }
    const { offsetHeight: contentHeight } = content.value
    const { offsetHeight: containerHeight } = container.value
    const { offsetHeight: yTrackHeight } = yTrack.value
    // Old: (containerHeight / contentHeight) * yTrackHeight
    const newBarSize = Math.min(yTrackHeight, (containerHeight * yTrackHeight) / contentHeight)
    yTrackBarSize.value = newBarSize
  }

  function updateXBarSize() {
    if (!content.value || !container.value || !xTrack.value) {
      xTrackBarSize.value = 0
      return
    }
    const { offsetWidth: xTrackWidth } = xTrack.value
    const { offsetWidth: contentWidth } = content.value
    const { offsetWidth: containerWidth } = container.value
    // Old: (containerWidth / contentWidth) * xTrackWidth
    xTrackBarSize.value = Math.min(xTrackWidth, (containerWidth * xTrackWidth) / contentWidth)
  }

  function updateYTrackScrollTop() {
    if (!content.value || !container.value || !yTrack.value) {
      yTrackScrollTop.value = 0
      return
    }
    const { offsetHeight: contentHeight } = content.value
    const { offsetHeight: containerHeight } = container.value
    const { offsetHeight: yTrackHeight } = yTrack.value
    const heightDiff = contentHeight! - containerHeight
    const rawRailScrollTop = (containerScrollTop.value / heightDiff) * (yTrackHeight - yTrackBarSize.value)
    const newYBarHeight = containerHeight / contentHeight * yTrackHeight
    const topUpperBound = yTrackHeight - newYBarHeight

    // 修复滚动条滚动距离过大的 bug
    yTrackScrollTop.value = Math.max(0, rawRailScrollTop > topUpperBound
      ? topUpperBound
      : rawRailScrollTop)
  }

  function handleMouseDownYScroll(e: MouseEvent) {
    yTop = container.value?.scrollTop || 0
    mouseY = e.clientY
    yBarPressed.value = true
    on(document, 'mousemove', handleMouseMoveYScroll)
    on(document, 'mouseup', handleMouseUpYScroll)
  }

  function handleMouseMoveYScroll(e: MouseEvent) {
    if (!yBarPressed.value || !content.value || !container.value || !yTrack.value) return

    const { offsetHeight: contentHeight } = content.value
    const { offsetHeight: containerHeight } = container.value
    const { offsetHeight: yTrackHeight } = yTrack.value

    const moveSize = e.clientY - mouseY
    const top = moveSize * (contentHeight - containerHeight) / (yTrackHeight - yTrackBarSize.value)

    const scrollTopUpperBound = contentHeight - containerHeight
    const rawScrollTop = yTop + top
    const scrollTop = rawScrollTop < 0
      ? 0
      : rawScrollTop > scrollTopUpperBound
        ? scrollTopUpperBound
        : rawScrollTop

    scrollToTop(scrollTop)
  }

  function handleMouseUpYScroll() {
    yBarPressed.value = false

    off(document, 'mousemove', handleMouseMoveYScroll)
    off(document, 'mouseup', handleMouseUpYScroll)
  }

  function updateXTrackScrollLeft() {
    if (!content.value || !container.value || !xTrack.value) {
      xTrackScrollLeft.value = 0
      return
    }
    const { offsetWidth: contentWidth } = content.value
    const { offsetWidth: containerWidth } = container.value
    const { offsetWidth: xTrackWidth } = xTrack.value
    const widthDiff = contentWidth - containerWidth
    const rawRailScrollLeft = (containerScrollLeft.value / widthDiff) * (xTrackWidth - xTrackBarSize.value)
    const newXBarWidth = containerWidth / contentWidth * xTrackWidth
    const leftUpperBound = xTrackWidth - newXBarWidth

    // 修复滚动条滚动距离过大的 bug
    xTrackScrollLeft.value = Math.max(0, rawRailScrollLeft > leftUpperBound
      ? leftUpperBound
      : rawRailScrollLeft)
  }

  function handleMouseDownXScroll(e: MouseEvent) {
    xLeft = container.value?.scrollLeft ?? 0
    mouseX = e.clientX
    xBarPressed.value = true
    on(document, 'mousemove', handleMouseMoveXScroll)
    on(document, 'mouseup', handleMouseUpXScroll)
  }

  function handleMouseMoveXScroll(e: MouseEvent) {
    if (!xBarPressed.value || !content.value || !container.value || !xTrack.value) return
    const { offsetWidth: contentWidth } = content.value
    const { offsetWidth: containerWidth } = container.value
    const { offsetWidth: xTrackWidth } = xTrack.value

    const moveSize = e.clientX - mouseX
    const left = moveSize * (contentWidth - containerWidth) / (xTrackWidth - xTrackBarSize.value)

    const rawScrollLeft = xLeft + left
    const scrollLeftUpperBound = contentWidth - containerWidth
    const scrollLeft = rawScrollLeft < 0
      ? 0
      : rawScrollLeft > scrollLeftUpperBound
        ? scrollLeftUpperBound
        : rawScrollLeft

    scrollToLeft(scrollLeft)
  }

  function handleMouseUpXScroll() {
    xBarPressed.value = false

    off(document, 'mousemove', handleMouseMoveXScroll)
    off(document, 'mouseup', handleMouseUpXScroll)
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
    updateYTrackScrollTop()
    updateXTrackScrollLeft()
    updateBarSize()
  }

  onMounted(() => {
    updateBarSize()
    contentResizeObserver.value = useResizeObserver(content, update)
  })

  onBeforeUnmount(() => {
    contentResizeObserver.value?.stop()
    if (yBarPressed.value) {
      off(document, 'mousemove', handleMouseMoveYScroll)
      off(document, 'mouseup', handleMouseUpYScroll)
    }
    if (xBarPressed.value) {
      off(document, 'mousemove', handleMouseMoveXScroll)
      off(document, 'mouseup', handleMouseUpXScroll)
    }
  })

  context.expose({ update, scrollTo, scrollBy, container })

  return () => {
    const YBar = (
      <div
        style={{ top: toPx(yTrackScrollTop.value), height: toPx(yTrackBarSize.value) }}
        class={['tu-scrollbar-track__scrollbar', {
          'tu-scrollbar-track__scrollbar--hidden': yTrackBarHidden.value
        }]}
        onMousedown={handleMouseDownYScroll}
      ></div>
    )

    const XBar = (
      <div
        style={{ left: toPx(xTrackScrollLeft.value), width: toPx(xTrackBarSize.value) }}
        class={['tu-scrollbar-track__scrollbar', {
          'tu-scrollbar-track__scrollbar--hidden': xTrackBarHidden.value
        }]}
        onMousedown={handleMouseDownXScroll}
      ></div>
    )

    return (
      <div class={['tu-scrollbar', { 'tu-scrollbar--large': props.size === 'large' }]} onMouseenter={handleMouseEnter} onMouseleave={handleMouseLeave}>
        <div ref={container} class={['tu-scrollbar-container']} onScroll={handleScroll}>
          <div ref={content} class="tu-scrollbar-content">{context.slots.default?.()}</div>
        </div>
        <div ref={yTrack} class="tu-scrollbar-track tu-scrollbar-track--vertical">
          {triggerisNont.value ? YBar : (
            <Transition name="tu-fade">
              {withDirectives(YBar, [[vShow, hover.value || yBarPressed.value]])}
            </Transition>
          )}
        </div>
        <div ref={xTrack} class="tu-scrollbar-track tu-scrollbar-track--horizontal">
          {triggerisNont.value ? XBar : <Transition name="tu-fade">
            {withDirectives(XBar, [[vShow, hover.value || xBarPressed.value]])}
          </Transition>}
        </div>
      </div>
    )
  }
}