// 添加 class
const dom = {
  trim(string) {
    return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  },

  addClass(el, name) {
    if (!el || !name) return
    if (typeof name !== 'string') return new Error('class 名称必须为字符串')
    let oldClass = el.className
    const classes = name.split(' ')
    for (const item of classes) {
      if (el.classList) {
        el.classList.add(item)
      } else {
        oldClass += ' ' + item
      }
    }
    if (!el.classList) {
      el.className = oldClass
    }
  },

  removeClass(el, name) {
    if (!el || !name) return
    if (typeof name !== 'string') return new Error('class 名称必须为字符串')
    let oldClass = ' ' + el.className + ' '
    const classes = name.split(' ')
    for (const item of classes) {
      if (el.className) {
        el.classList.remove(item)
      } else {
        oldClass = oldClass.replace(' ' + item + ' ', ' ')
      }
    }
    if (!el.classList) {
      el.className = dom.trim(oldClass)
    }
  },

  getStyle(el) {
    const style = window.getComputedStyle(el, null)
    return {
      paddingTop: parseInt(style.paddingTop, 10),
      paddingLeft: parseInt(style.paddingLeft, 10),
      paddingRight: parseInt(style.paddingRight, 10),
      paddingBottom: parseInt(style.paddingBottom, 10),
      marginTop: parseInt(style.marginTop, 10),
      marginLeft: parseInt(style.marginLeft, 10),
      marginRight: style.marginRight,
      marginBottom: parseInt(style.marginBottom, 10)
    }
  }
}

export default dom
