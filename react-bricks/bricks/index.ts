import { types } from 'react-bricks/rsc'

import HeroUnit from './HeroUnit'
import Pokemon from './Pokemon'
import features from './features'
import layout from './layout'

const bricks: types.Brick<any>[] = [HeroUnit, ...layout, ...features, Pokemon]

export default bricks
