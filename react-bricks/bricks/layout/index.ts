import { types } from 'react-bricks/rsc'

import Button from './Button'
import Footer from './Footer'
import FooterColumn from './FooterColumn'
import FooterLink from './FooterLink'
import Header from './Header'
import HeaderMenuItem from './HeaderMenuItem'
import HeaderMenuSubItem from './HeaderMenuSubItem'

const layout: types.Brick<any>[] = [
  Header,
  HeaderMenuItem,
  HeaderMenuSubItem,
  Footer,
  FooterColumn,
  FooterLink,
  Button,
]

export default layout
