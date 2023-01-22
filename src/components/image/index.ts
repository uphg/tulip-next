import Image from './src/Image'
import ImageGroup from './src/ImageGroup'
import { withInstall } from '../../utils'

const TuImage = withInstall(Image)
const TuImageGroup = withInstall(ImageGroup)

export { TuImage, TuImageGroup }