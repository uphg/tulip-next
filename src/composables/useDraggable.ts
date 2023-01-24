import { computed, ref, toRef, watch, type Ref, type ToRefs } from 'vue'
import { useEventListener } from './useEventListener'
import { resolveUnref } from './resolveUnref'
import { isClient } from '../utils'
import { defaultWindow } from '../configurable'
import { toRefs } from './toRefs'
import type { Position, MaybeElementRef, MaybeElement, Fn } from '../types'
import {  } from 'fs'

type UseDraggableOptions = {
  initialValue?: Position,
  draggingElement?: MaybeElement
}

export function useDraggable(target: MaybeElementRef, options?: UseDraggableOptions) {
  const position = ref(options?.initialValue ?? { x: 0, y: 0 })
  const pressedDelta = ref<Position>()
  const draggingElement = options?.draggingElement ?? defaultWindow
  const cleanups: Fn[] = []

  function start(e: PointerEvent) {
    const rect = (resolveUnref(target) as Element)?.getBoundingClientRect()
    pressedDelta.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function move(e: PointerEvent) {
    if (!pressedDelta.value) return
    position.value = {
      x: e.clientX - pressedDelta.value.x,
      y: e.clientY - pressedDelta.value.y
    }
  }

  function end() {
    pressedDelta.value = void 0
  }

  if (isClient) {
    cleanups[0] = useEventListener(target, 'pointerdown', start)
    cleanups[1] = useEventListener(draggingElement, 'pointermove', move)
    cleanups[2] = useEventListener(draggingElement, 'pointerup', end)
  }

  function cleanup() {
    cleanups.forEach(fn => fn())
  }

  return {
    ...toRefs(position),
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(() => ({ left: `${position.value.x}px`, top: `${position.value.y}px` })),
    cleanup
  }
}