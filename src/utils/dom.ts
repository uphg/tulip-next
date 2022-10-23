import type { StyleElement } from '../interfaces'
import isObject from './isObject'
import camelize from "./camelize";
import each from './each'
import mergeClass from './internal/mergeClass'
import splitClass from './internal/splitClass'
import toString from './toString'

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

export function getStyle(el: HTMLElement, styleName: string): string {
  if (!el || !styleName) return ''
  styleName = camelize(styleName)
  // see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle#defaultview
  const computed = document.defaultView?.getComputedStyle(el, '')
  // @ts-ignore
  return (computed ? computed?.[styleName] : el['style'][styleName]) || ''
}

type Styles = { [key: string]: string | number }

export function setStyle(_el: Element, styles: Styles | string, value?: string) {
  const el = _el as StyleElement
  if (isObject(styles)) {
    each(styles as Styles, (item, key) => setStyle(el, key as string, toString(item)))
    return
  }
  const styleName = camelize(styles as string)
  el.style[styleName] = value
}

export const getRect = (el: HTMLElement | null, property: string)=>{
  return el?.getBoundingClientRect()[property as keyof DOMRect] as number
}
