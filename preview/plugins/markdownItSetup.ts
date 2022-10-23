import path from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import { highlight } from './highlight'
import { linksPlugin } from './linksPlugin'

const demoPath = `${path.resolve('./docs/demo')}`
const demoRegex = /^demo\s*(.*)$/
const codePath = `${path.resolve('./')}`
const codeRegex = /^code\s*(.*)$/

function getComponentName(sourceFile) {
  const names = sourceFile.split(/[\/-]/)
  return names.map((item) => item.replace(/^(\w)/, (_, c) => (c ? c.toUpperCase() : ''))).join('')
}

function markdownItSetup(md) {
  md.use(linksPlugin)
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(demoRegex)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(demoRegex)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const sourceFileToken = tokens[idx + 2]
        if (!sourceFileToken) return
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(demoPath, `${sourceFile}.vue`),
            'utf-8'
          )
        }

        const componentName = getComponentName(sourceFile)
        const names = sourceFile.split('/')
        return `<e-demo
          class="demo-${names[0]}"
          component-name="${componentName}"
          source="${encodeURIComponent(
          highlight(source, 'vue')
        )}"
          :part="${componentName}"
        >`
      } else {
        return '</e-demo>'
      }
    },
  })

  md.use(mdContainer, 'code', {
    validate(params) {
      return !!params.trim().match(codeRegex)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(codeRegex)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const sourceFileToken = tokens[idx + 2]
        if (!sourceFileToken) return
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        const fileSuffix = sourceFile.match(/[^\.]+$/)[0]
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(codePath, `${sourceFile}`),
            'utf-8'
          )
        }

        return `<e-code
          code="${encodeURIComponent(
            highlight(source, fileSuffix)
          )}"
        >`
      } else {
        return '</e-code>'
      }
    },
  })
}

export default markdownItSetup