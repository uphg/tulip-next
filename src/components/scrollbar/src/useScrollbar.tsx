import { computed, onBeforeUnmount, onMounted, ref, shallowRef, Transition, vShow, withDirectives, type SetupContext } from 'vue'
import type { ScrollbarProps } from './scrollbarProps'
import { toPx, withAttrs, on, off, toNumber } from '../../../utils'
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
    const { offsetHeight: contentHeight } = withAttrs(content.value)
    const { offsetHeight: containerHeight } = withAttrs(container.value)
    const { offsetHeight: yTrackHeight } = withAttrs(yTrack.value)
    if (contentHeight === 0 || containerHeight === 0) {
      yTrackBarSize.value = 0
      return
    }
    // Old: (containerHeight / contentHeight) * yTrackHeight
    const newBarSize = Math.min(yTrackHeight, (containerHeight * yTrackHeight) / contentHeight)
    yTrackBarSize.value = newBarSize
  }

  function updateXBarSize() {
    const { offsetWidth: xTrackWidth } = withAttrs(xTrack.value)
    const { offsetWidth: contentWidth } = withAttrs(content.value)
    const { offsetWidth: containerWidth } = withAttrs(container.value)
    if (contentWidth === 0 || containerWidth === 0) {
      xTrackBarSize.value = 0
      return
    }

    // Old: (containerWidth / contentWidth) * xTrackWidth
    xTrackBarSize.value = Math.min(xTrackWidth, (containerWidth * xTrackWidth) / contentWidth)
  }

  function updateYTrackScrollTop() {
    const { offsetHeight: contentHeight } = withAttrs(content.value)
    const { offsetHeight: containerHeight } = withAttrs(container.value)
    if (contentHeight === 0 || containerHeight === 0) {
      yTrackScrollTop.value = 0
      return
    }

    const { offsetHeight: yTrackHeight } = withAttrs(yTrack.value)
    const heightDiff = contentHeight! - containerHeight
    const rawRailScrollTop = (containerScrollTop.value / heightDiff) * (yTrackHeight - yTrackBarSize.value)
    const newYBarHeight = containerHeight / contentHeight * yTrackHeight
    const topUpperBound = yTrackHeight - newYBarHeight

    // 修复滚动条滚动距离过大的 bug
    yTrackScrollTop.value = Math.max(0, rawRailScrollTop > topUpperBound
      ? topUpperBound
      : rawRailScrollTop)
  }

  function handleYScrollMouseDown(e: MouseEvent) {
    yTop = container.value?.scrollTop || 0
    mouseY = e.clientY
    yBarPressed.value = true
    on(document, 'mousemove', handleYScrollMouseMove)
    on(document, 'mouseup', handleYScrollMouseUp)
  }

  function handleYScrollMouseMove(e: MouseEvent) {
    if (!yBarPressed.value) return

    const { offsetHeight: yTrackHeight } = withAttrs(yTrack.value)
    const { offsetHeight: contentHeight } = withAttrs(content.value)
    const { offsetHeight: containerHeight } = withAttrs(container.value)

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

  function handleYScrollMouseUp() {
    yBarPressed.value = false

    off(document, 'mousemove', handleYScrollMouseMove)
    off(document, 'mouseup', handleYScrollMouseUp)
  }

  function updateXTrackScrollLeft() {
    const { offsetWidth: contentWidth } = withAttrs(content.value)
    const { offsetWidth: containerWidth } = withAttrs(container.value)
    if (contentWidth === 0 || containerWidth === 0) {
      xTrackScrollLeft.value = 0
      return
    }
    const { offsetWidth: xTrackWidth } = withAttrs(xTrack.value)
    const widthDiff = contentWidth - containerWidth
    const rawRailScrollLeft = (containerScrollLeft.value / widthDiff) * (xTrackWidth - xTrackBarSize.value)
    const newXBarWidth = containerWidth / contentWidth * xTrackWidth
    const leftUpperBound = xTrackWidth - newXBarWidth

    // 修复滚动条滚动距离过大的 bug
    xTrackScrollLeft.value = Math.max(0, rawRailScrollLeft > leftUpperBound
      ? leftUpperBound
      : rawRailScrollLeft)
  }

  function handleXScrollMouseDown(e: MouseEvent) {
    xLeft = container.value?.scrollLeft ?? 0
    mouseX = e.clientX
    xBarPressed.value = true
    on(document, 'mousemove', handleXScrollMouseMove)
    on(document, 'mouseup', handleXScrollMouseUp)
  }

  function handleXScrollMouseMove(e: MouseEvent) {
    if (!xBarPressed.value) return
    const { offsetWidth: xTrackWidth } = withAttrs(xTrack.value)
    const { offsetWidth: contentWidth } = withAttrs(content.value)
    const { offsetWidth: containerWidth } = withAttrs(container.value)

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
    updateYTrackScrollTop()
    updateXTrackScrollLeft()
    updateBarSize()
  }

  context.expose({ update, scrollTo, scrollBy, container })

  onMounted(() => {
    updateBarSize()
    contentResizeObserver.value = useResizeObserver(content, () => {
      update()
    })
  })

  onBeforeUnmount(() => {
    contentResizeObserver.value?.stop()
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
        style={{ top: toPx(yTrackScrollTop.value), height: toPx(yTrackBarSize.value) }}
        class={['tu-scrollbar-track__scrollbar', {
          'tu-scrollbar-track__scrollbar--hidden': yTrackBarHidden.value
        }]}
        onMousedown={handleYScrollMouseDown}
      ></div>
    )

    const XBar = (
      <div
        style={{ left: toPx(xTrackScrollLeft.value), width: toPx(xTrackBarSize.value) }}
        class={['tu-scrollbar-track__scrollbar', {
          'tu-scrollbar-track__scrollbar--hidden': xTrackBarHidden.value
        }]}
        onMousedown={handleXScrollMouseDown}
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