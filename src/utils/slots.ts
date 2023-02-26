import { Fragment, type SetupContext, type VNode, type VNodeChild } from 'vue'
import { isNil } from './isNil'

export function getSlot<T extends any>(context: SetupContext<T>, slotName = 'default') {
  const slot = context.slots[slotName]
  return slot ? slot() : []
}

export function flattenSlots(
  vNodes: VNodeChild[],
  result: VNode[] = []
) {
  vNodes.forEach((vNode) => {
    if (isNil(vNode)) return
    const { type, children } = vNode as VNode
    if (type === Fragment) {
      if (children === null) return
      if (Array.isArray(children)) {
        flattenSlots(children, result)
      }
      // rawSlot
    } else if (type !== Comment) {
      result.push(vNode as VNode)
    }
  })

  return result
}