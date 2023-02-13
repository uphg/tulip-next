import { computed, nextTick, ref, type Ref } from 'vue'
import { on, off, isTarget } from '../utils'
import { unrefElement } from './unrefElement'
import type { Fn, MaybeElementRef, VueInstance, MaybeElement, PopupTrigger } from '../types'

export type UsePopupTriggerOptions = {
  popup: MaybeElementRef,
  triggerMode: PopupTrigger,
  open: Fn,
  close: Fn
}

export function usePopupTriggerMode(_trigger: MaybeElementRef, options: UsePopupTriggerOptions) {
  const { popup: _popup, triggerMode, open, close } = options

  const visible = ref(false)
  const trigger = computed(() => unrefElement(_trigger))
  const popup = computed(() => unrefElement(_popup))

  function isTrigger(event: MouseEvent) {
    return isTarget(trigger.value, event)
  }

  function isPopup(event: MouseEvent) {
    return isTarget(popup.value, event)
  }

  const events = {
    hover: useHoverTrigger(visible, { open, close, isPopup, isTrigger }),
    click: useClickTrigger(visible, { open, close, isPopup, isTrigger }),
    focus: { onFocus: open, onBlur: close },
    manual: { },
  }[triggerMode]

  return { visible, popup, trigger, events }
}

type TriggerModeOptions = {
  open: Fn,
  close: Fn,
  isPopup: (e: MouseEvent) => boolean,
  isTrigger: (e: MouseEvent) => boolean
}

function useHoverTrigger(visible: Ref<boolean>, options: TriggerModeOptions) {
  const { open, close, isPopup, isTrigger } = options
  const hovered = ref(false)
  const closeTimerId = ref<NodeJS.Timeout | null>(null)

  function onMouseover() {
    hovered.value = true
    if (!visible.value) {
      // 进入
      open()
      nextTick(() => on(document, 'mouseover', handleDomMouseover))
    }
  }

  function handleDomMouseover(e: MouseEvent){
    isPopup(e) || isTrigger(e) ? handleHoverMoveIn() : handleHoverMoveOut()
  }

  function handleHoverMoveIn() {
    if (!closeTimerId.value) return
    window.clearTimeout(closeTimerId.value!)
    closeTimerId.value = null
    hovered.value = true
  }

  function handleHoverMoveOut() {
    if (!hovered.value) return
    if (visible.value) {
      closeTimerId.value = setTimeout(() => {
        if (closeTimerId.value) {
          window.clearTimeout(closeTimerId.value)
          closeTimerId.value = null
          off(document, 'mouseover', handleDomMouseover)
          close()
        }
      }, 200)
    }
    hovered.value = false
  }

  return { onMouseover }
}

function useClickTrigger(visible: Ref<boolean>, options: TriggerModeOptions) {
  const { open, close, isPopup, isTrigger } = options
  const mousedown = ref(false)

  function onClick() {
    if (visible.value) {
      close()
    } else {
      open()
      nextTick(() => {
        on(document, 'mousedown', handleDomMousedown)
        on(document, 'mouseup', handleDomMouseup)
      })
    }
  }

  function handleDomMousedown(event: MouseEvent) {
    if (isPopup(event)) return
    mousedown.value = true
  }

  function handleDomMouseup(event: MouseEvent) {
    if (!isTrigger(event) && !isPopup(event) && mousedown.value) {
      close()
      off(document, 'mousedown', handleDomMousedown)
      off(document, 'mouseup', handleDomMouseup)
    }
    if (mousedown.value) {
      mousedown.value = false
    }
  }

  return { onClick }
}