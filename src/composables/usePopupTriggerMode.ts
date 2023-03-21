import { computed, nextTick, ref, type Ref } from 'vue'
import { on, off, isTarget } from '../utils'
import { unrefElement } from './unrefElement'
import type { Fn, MaybeElementRef, PopupTrigger } from '../types'

export type UsePopupTriggerOptions = {
  popup: MaybeElementRef,
  triggerMode: PopupTrigger
}

export type UsePopupTriggerModeReturn = {
  visible: Ref<boolean>,
  events: { [k: string]: (e: Event) => void },
  open: Fn,
  close: Fn,
  [k: string]: unknown
}

export function usePopupTriggerMode(_trigger: MaybeElementRef, options: UsePopupTriggerOptions) {
  const { popup: _popup, triggerMode } = options

  const visible = ref(false)
  const trigger = computed(() => unrefElement(_trigger))
  const popup = computed(() => unrefElement(_popup))

  function isTrigger(event: MouseEvent) {
    return isTarget(trigger.value, event)
  }

  function isPopup(event: MouseEvent) {
    return isTarget(popup.value, event)
  }

  return {
    hover: useHoverTrigger(visible, { isPopup, isTrigger }),
    click: useClickTrigger(visible, { isPopup, isTrigger }),
    focus: useFocusTrigger(visible),
    manual: { visible, events: {}, ...generateSwitch(visible) },
  }[triggerMode] as UsePopupTriggerModeReturn
}

type TriggerModeOptions = {
  isPopup: (e: MouseEvent) => boolean,
  isTrigger: (e: MouseEvent) => boolean
}

function useHoverTrigger(visible: Ref<boolean>, options: TriggerModeOptions) {
  const { isPopup, isTrigger } = options
  const hover = ref(false)
  const closeTimerId = ref<number | null>(null)

  function onMouseover() {
    hover.value = true
    if (!visible.value) {
      // 进入
      visible.value = true
      nextTick(() => on(document, 'mouseover', handleDomMouseover))
    }
  }

  function handleHoverMoveOut() {
    if (!hover.value) return
    if (visible.value) {
      closeTimerId.value = window.setTimeout(() => {
        if (closeTimerId.value) {
          window.clearTimeout(closeTimerId.value)
          closeTimerId.value = null
          off(document, 'mouseover', handleDomMouseover)
          visible.value = false
        }
      }, 200)
    }
    hover.value = false
  }

  function handleDomMouseover(e: MouseEvent){
    isPopup(e) || isTrigger(e) ? handleHoverMoveIn() : handleHoverMoveOut()
  }

  function handleHoverMoveIn() {
    if (!closeTimerId.value) return
    window.clearTimeout(closeTimerId.value!)
    closeTimerId.value = null
    hover.value = true
  }

  const events = { onMouseover }

  return { visible, events, open: onMouseover, close: handleHoverMoveOut }
}

function useClickTrigger(visible: Ref<boolean>, options: TriggerModeOptions) {
  const { isPopup, isTrigger } = options
  const mousedown = ref(false)

  function onClick() {
    visible.value ? close() : open()
  }

  function handleDomMousedown(event: MouseEvent) {
    if (isPopup(event)) return
    mousedown.value = true
  }

  function handleDomMouseup(event: MouseEvent) {
    if (!isTrigger(event) && !isPopup(event) && mousedown.value) {
      close()
    }
    if (mousedown.value) {
      mousedown.value = false
    }
  }

  function open() {
    visible.value = true
    nextTick(() => {
      on(document, 'mousedown', handleDomMousedown)
      on(document, 'mouseup', handleDomMouseup)
    })
  }

  function close() {
    visible.value = false
    off(document, 'mousedown', handleDomMousedown)
    off(document, 'mouseup', handleDomMouseup)
  }

  const events = { onClick }

  return { visible, events, open, close }
}

function useFocusTrigger(visible: Ref<boolean>) {
  const { open, close } = generateSwitch(visible)
  return {
    visible,
    events: { onFocus: open, onBlur: close },
    open,
    close
  }
}

function generateSwitch(visible: Ref<boolean>) {
  return {
    open() { visible.value = true },
    close() { visible.value = false }
  }
}
