import type { PropType } from 'vue'

type GlabelType = 'inherit' | 'initial' | 'unset'
type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse' | GlabelType
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse' | 'revert' | GlabelType
type FlexGrow = number | 'revert' | GlabelType

const flexDirection = String as PropType<FlexDirection>

const baseLayoutProps = {
  flexWrap: String as PropType<FlexWrap>,
  flexGrow: [String, Number] as PropType<FlexGrow>,
  width: [String, Number] as PropType<string | number>, 
  height: [String, Number] as PropType<string | number>
}

export const layoutProps = {
  flexDirection: {
    type: flexDirection,
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
  flexDirection,
  ...baseLayoutProps
}

export const headerProps = {
  flexDirection,
  ...baseLayoutProps
}
export const contentProps = {
  flexDirection,
  ...baseLayoutProps
}
export const footerProps = {
  flexDirection,
  ...baseLayoutProps
}