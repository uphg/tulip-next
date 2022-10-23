import type { PluginWithOptions } from 'markdown-it'
import type * as Token from 'markdown-it/lib/token'

export interface LinksPluginOptions {
  externalAttrs?: Record<string, string>
}

export const linksPlugin: PluginWithOptions<LinksPluginOptions> = (
  md,
  options: LinksPluginOptions = {}
) => {

  const externalAttrs = {
    target: '_blank',
    rel: 'noopener noreferrer',
    ...options.externalAttrs,
  }

  const handleLinkOpen = (tokens: Token[], idx: number) => {
    const token = tokens[idx]
    Object.entries(externalAttrs).forEach(([key, val]) => {
      token.attrSet(key, val)
    })
  }

  // a 标签开始部分
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    handleLinkOpen(tokens, idx)
    return self.renderToken(tokens, idx, options)
  }

  // a 标签结束部分
  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options)
  }
}