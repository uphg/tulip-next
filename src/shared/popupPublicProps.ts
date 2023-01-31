import type { ExtractPropTypes, PropType } from 'vue'
import { includes } from '../utils'

type PlacementTypes = 'top-start' | 'top' | 'top-end' |
'left-start' | 'left' | 'left-end' |
'right-start' | 'right' | 'right-end' |
'bottom-start' | 'bottom' | 'bottom-end'

const triggerTypes = ['hover', 'click', 'focus', 'manual']

const placementTypes = [
  'top-start', 'top', 'top-end',
  'left-start', 'left', 'left-end',
  'right-start', 'right', 'right-end',
  'bottom-start', 'bottom', 'bottom-end',
]

export const popupPublicProps = {
  
}