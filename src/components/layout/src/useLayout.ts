import { computed, type SetupContext, type StyleValue } from 'vue'
import type { CommonLayoutProps } from './props'
import { toCSSValue } from './toCSSValue'

export function useLayoutStyle<T extends CommonLayoutProps>(props:T, context?: SetupContext) {
  const style = computed(() => ({
    width: toCSSValue(props.width),
    height: toCSSValue(props.height),
    flexDirection: props.direction,
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
    flexGrow: props.grow
  }) as StyleValue)

  return style
}