import type { StyleElement } from '../interfaces'
import { isObject } from './isObject'
import { camelize } from './camelize'
import { each } from './each'
import { toString } from './toString'
import { mergeClass } from './internal/mergeClass'
import { splitClass } from './internal/splitClass'

const reOverflowScroll = /(auto|scroll|overlay)/

type Styles = { [key: string]: string | number }

export function addClass(el: Element, ...args: string[] | string[][]) {
  const classNames = mergeClass(args)
  if (el.classList) {
    el.classList.add(...classNames)
    return
  }
  const className = (el.getAttribute('class') || '') + ` ${classNames.join(' ')}`
  el.setAttribute('class', className)
}

export function removeClass(el: Element, ...args: string[]) {
  const classNames = mergeClass(args)
  if (el.classList) {
    el.classList.remove(...classNames)
    return
  }
  let prev = el.getAttribute('class') || ''
  each(classNames, (item) => {
    prev = prev.replace(` ${item} `, '')
  })
  const mergings = splitClass(prev)
  mergings && el.setAttribute('class', mergings.join(' '))
}

export function getStyle(el: Element, styleName: string): string {
  if (!el || !styleName) return ''
  return (el as HTMLElement).style[styleName as unknown as number]
  // styleName = camelize(styleName)
  // // see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle#defaultview
  // const computed = document.defaultView?.getComputedStyle(el, '')
  // // @ts-ignore
  // return (computed ? computed?.[styleName] : el['style'][styleName]) || ''
}

export function setStyle(_el: Element, styles: Styles | string, value?: string) {
  const el = _el as StyleElement
  if (isObject(styles)) {
    each(styles as Styles, (item, key) => setStyle(el, key as string, toString(item)))
    return
  }
  const styleName = camelize(styles as string)
  el.style[styleName] = value
}

export function getRelativeDOMPosition(el: HTMLElement) {
  const { top, left } = el?.getBoundingClientRect?.() || {}
  const { scrollTop, scrollLeft } = document.documentElement
  
  return {
    top: top + scrollTop,
    left: left + scrollLeft
  }
}

export function getParentNode(node: Node): Node | null {
  // document type === 9
  return node.nodeType === 9 ? null : node.parentNode
}

export function getScrollParent(node: Node | null): HTMLElement | Document | null {
  if (node === null) return null

  const parentNode = getParentNode(node) as HTMLElement

  if (parentNode === null) {
    return null
  }

  if (parentNode.nodeType === 9) {
    return document
  }

  if (parentNode?.nodeType === 1) {
    const { overflow, overflowX, overflowY } = getComputedStyle(parentNode)    
    if (reOverflowScroll.test(overflow + overflowX + overflowY)) {
      return parentNode
    }
  }

  return getScrollParent(parentNode)
}
