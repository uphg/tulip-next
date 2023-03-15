import type { ExtractPropTypes, PropType } from 'vue'

type GlabelType = 'inherit' | 'initial' | 'unset'
type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse' | GlabelType
// type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse' | 'revert' | GlabelType
type FlexGrow = number | 'revert' | GlabelType

const direction = String as PropType<FlexDirection>
export type CommonLayoutProps = ExtractPropTypes<typeof commonLayoutProps>

const baseLayoutProps = {
  width: [String, Number] as PropType<string | number>, 
  height: [String, Number] as PropType<string | number>,
  wrap: Boolean as PropType<boolean>,
  grow: [String, Number] as PropType<FlexGrow>,
}

export const commonLayoutProps = {
  direction,
  ...baseLayoutProps
}

export const layoutProps = {
  direction: {
    type: direction,
    default: 'column'
  },
  ...baseLayoutProps
}

export const sidebarProps = {
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: void 0
  },
  collapsedWidth: {
    type: [String, Number] as PropType<string | number>,
    default: 64
  },
  direction,
  ...baseLayoutProps
}

export const headerProps = commonLayoutProps
export const contentProps = commonLayoutProps
export const footerProps = commonLayoutProps