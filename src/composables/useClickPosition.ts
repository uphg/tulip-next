import { getCurrentScope, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { isClient, off, on, useEmitter } from '../utils'
import type { Fn } from '../types'

interface MousePosition {
  x: number
  y: number
}

const mousePosition = ref<MousePosition | null>(null)
const emitter = useEmitter()

let usedCount = 0
let onEnterModal: Fn | null = null

export function useClickPosition() {
  if (!isClient) return
  if (usedCount === 0) {
    emitter.on('enterModal', handleEnterModal)
    on(document, 'click', handleClick)
  }

  if (getCurrentScope()) {
    onBeforeMount(setup)
    onBeforeUnmount(clear)
  }

  return { mousePosition, emitter }
}

function handleEnterModal(fn: unknown) {
  onEnterModal = fn as Fn
}

function handleClick(e: MouseEvent) {
  if (e.clientX > 0 || e.clientY > 0) {
    mousePosition.value = {
      x: e.clientX,
      y: e.clientY
    }
  } else {
    mousePosition.value = {
      x: 0,
      y: 0
    }
  }

  if (onEnterModal) {
    onEnterModal()
    onEnterModal = null
  }
}

function setup() {
  usedCount += 1
}

function clear() {
  usedCount -= 1
  if (usedCount === 0) {
    off(document, 'click', handleClick)
    emitter.off('enterModal', handleEnterModal)
  }
}