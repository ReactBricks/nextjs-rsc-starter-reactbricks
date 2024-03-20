import { types } from 'react-bricks/rsc'

import HeroUnit from './HeroUnit'
import features from './features'
import layout from './layout'

const bricks: types.Brick<any>[] = [HeroUnit, ...layout, ...features]

export default bricks
