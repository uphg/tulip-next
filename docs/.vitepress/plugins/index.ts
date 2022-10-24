import path from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import { getHighlighter } from 'shiki'

const demoPath = `${path.resolve('./docs/examples')}`
const demoRegex = /^demo\s*(.*)$/
const demoTag = 'EDemo'
const codePath = `${path.resolve('./')}`
const codeRegex = /^code\s*(.*)$/
const codeTag = 'ECode'

function getComponentName(sourceFile) {
  const names = sourceFile.split(/[\/-]/)
  return names.map((item) => item.replace(/^(\w)/, (_, c) => (c ? c.toUpperCase() : ''))).join('')
}

async function mdPlugin(md) {
  const highlighter = await getHighlighter({
    // theme: 'nord',
    theme: 'material-palenight'
  })

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
        const code = highlighter.codeToHtml(source, { lang: 'vue' })

        return `<${demoTag}
          class="demo-${names[0]}"
          component-name="${componentName}"
          source="${encodeURIComponent(source)}"
          html="${encodeURIComponent(code)}"
          :part="${componentName}"
        >`
      } else {
        return `</${demoTag}>`
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

        const code = highlighter.codeToHtml(source, { lang: fileSuffix })

        return `<${codeTag}
          html="${encodeURIComponent(code)}"
        >`
      } else {
        return `</${codeTag}>`
      }
    },
  })
}

export default mdPlugin