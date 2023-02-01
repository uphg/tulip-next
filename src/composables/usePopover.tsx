import { ref, type VNode } from 'vue'
import type { MaybeElementRef } from '../types'
import type { PlacementTypes, PopoverTrigger } from '../components/popover/src/popoverProps'

export type UsePopoverOptions = {
  trigger: PopoverTrigger,
  placement: PlacementTypes,
  popoverMargin: string | number,
  arrowMargin: string | number,
  hideArrow: boolean
}

type PopoverChildren = string | (() => VNode | VNode[])

export function usePopover(target: MaybeElementRef, children: PopoverChildren, _options: UsePopoverOptions) {
  const options = Object.assign({
    trigger: 'hover',
    placement: 'top',
    popoverMargin: 8,
    arrowMargin: 10,
    hideArrow: false
  }, _options)
  const load = ref(false)
  
}