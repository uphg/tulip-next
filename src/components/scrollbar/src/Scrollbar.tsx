import { computed, defineComponent, onBeforeUnmount, onMounted, ref, shallowRef, h, Transition, vShow, withDirectives, nextTick, type PropType, type ShallowRef, type StyleValue } from 'vue'
import { toPx, withAttrs } from '../../../utils'
import { useMutationObserver, type useMutationObserverReturn } from '../../../composables/useMutationObserver'

const scrollbarProps = {
  trigger: {
    type: String as PropType<'hover' | 'none'>,
    default: 'hover'
  },
  onScroll: Function as PropType<(e: Event) => void>
}

export const Wrapper = defineComponent({
  name: 'TuWrapper',
  setup(_, context) {
    return () => context.slots.default?.()
  }
})

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
    const hover = ref(false)
    const xBarPressed = ref(false)
    const yBarPressed = ref(false)
    
    let memoYTop = 0
    let memoXLeft = 0
    let memoMouseY = 0
    let memoMouseX = 0

    const trackYBarHidden = computed(() => trackYBarSize.value >= withAttrs(trackY.value).offsetHeight)
    const trackXBarHidden = computed(() => trackXBarSize.value >= withAttrs(trackX.value).offsetWidth)
    const triggerisNont = computed(() => props.trigger === 'none')

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
      const heightDiff = contentHeight! - containerHeight
      const rawRailScrollTop = (containerScrollTop.value / heightDiff) * (trackYHeight - trackYBarSize.value)
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
      yBarPressed.value = true
      document.addEventListener('mousemove', handleYScrollMouseMove)
      document.addEventListener('mouseup', handleYScrollMouseUp)
    }

    function handleYScrollMouseMove(e: MouseEvent) {
      if (!yBarPressed.value) return

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
      yBarPressed.value = false
      document.removeEventListener('mousemove', handleYScrollMouseMove)
      document.removeEventListener('mouseup', handleYScrollMouseUp)
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
      const { offsetWidth: contentWidth } = withAttrs(content.value)
      const { offsetWidth: containerWidth } = withAttrs(container.value)
      if (contentWidth === 0 || containerWidth === 0) {
        trackScrollLeft.value = 0
        return
      }
      const { offsetWidth: trackXWidth } = withAttrs(trackX.value)
      const widthDiff = contentWidth - containerWidth
      const rawRailScrollLeft = (containerScrollLeft.value / widthDiff) * (trackXWidth - trackXBarSize.value)
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
      xBarPressed.value = true
      document.addEventListener('mousemove', handleXScrollMouseMove)
      document.addEventListener('mouseup', handleXScrollMouseUp)
    }

    function handleXScrollMouseMove(e: MouseEvent) {
      if (!xBarPressed.value) return
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
      xBarPressed.value = false
      document.removeEventListener('mousemove', handleXScrollMouseMove)
      document.removeEventListener('mouseup', handleXScrollMouseUp)
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
      updateScrollState()
      updateTrackYScrollTop()
      updateTrackXScrollLeft()
      updateBarSize()
    }

    function renderBar(elRef: ShallowRef<HTMLElement | null>, style: StyleValue, onMousedown: (payload: MouseEvent) => void) {
      return (
        <div
          ref={elRef}
          style={style}
          class={['tu-scrollbar-track__scrollbar', { 'tu-scrollbar-track__scrollbar--hidden': trackYBarHidden.value }]}
          onMousedown={onMousedown}
        ></div>
      )
    }

    context.expose({ update, scrollTo, scrollBy })

    onMounted(() => {
      updateBarSize()
      contentListener.value = useMutationObserver(content, () => {
        update()
      }, { attributes: true, childList: true, subtree: true })
    })

    onBeforeUnmount(() => {
      contentListener.value?.stop()
      if (yBarPressed.value) {
        document.removeEventListener('mousemove', handleYScrollMouseMove)
        document.removeEventListener('mouseup', handleYScrollMouseUp)
      }
      if (xBarPressed.value) {
        document.removeEventListener('mousemove', handleXScrollMouseMove)
        document.removeEventListener('mouseup', handleXScrollMouseUp)
      }
    })

    return () => {
      const YBar = renderBar(trackYBar, { top: toPx(trackScrollTop.value), height: toPx(trackYBarSize.value) }, handleYScrollMouseDown)
      const XBar = renderBar(trackXBar, { left: toPx(trackScrollLeft.value), width: toPx(trackXBarSize.value) }, handleXScrollMouseDown)

      return (
        <div class={'tu-scrollbar'} onMouseenter={handleMouseEnter} onMouseleave={handleMouseLeave}>
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
})

export default Scrollbar
