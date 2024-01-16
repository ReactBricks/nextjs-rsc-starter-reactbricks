import { Link, Plain, Repeater, Text, types } from 'react-bricks/rsc'

import styles from '../../../css/HeaderMenuItem.module.css'
import HeaderMenuItemProvider from './HeaderMenuItemProvider'
import { ItemMenuClient } from './ItemMenuClient'
import HeaderMenuItemClient from './HeaderMenuItemClient'

interface HeaderMenuItemProps {
  linkPath: string
  linkText: any
  submenuItems: any
}

const HeaderMenuItem: types.Brick<HeaderMenuItemProps> = (props) => {
  const { linkPath, linkText, submenuItems } = props

  if (!submenuItems || !submenuItems.length) {
    return (
      <div>
        <Link
          href={linkPath}
          className={styles.linkMenuItem}
          activeClassName={styles.linkMenuItemActive}
        >
          <Text
            propName="linkText"
            value={linkText}
            placeholder="Type a text..."
            renderBlock={({ children }) => <span>{children}</span>}
          />
        </Link>
        <Link href={linkPath} className={styles.linkHamburgerMenuItem}>
          <ItemMenuClient
            type="DIV"
            clickAction="SET_MOBILE_MENU_OPEN_FALSE"
            refName="NONE"
          >
            {' '}
            {typeof linkText === 'string'
              ? linkText
              : Plain.serialize(linkText)}
          </ItemMenuClient>
        </Link>
      </div>
    )
  }

  return (
    <HeaderMenuItemProvider>
      <div>
        <HeaderMenuItemClient
          menuItemText={
            <Text
              propName="linkText"
              value={linkText}
              placeholder="Type a text..."
              renderBlock={({ children }) => <div>{children}</div>}
            />
          }
          submenuItems={
            <Repeater
              propName="submenuItems"
              items={submenuItems}
              renderItemWrapper={(item) => (
                <ItemMenuClient
                  key={item.key}
                  type="DIV"
                  clickAction="SET_OPEN"
                  refName="NONE"
                >
                  {item}
                </ItemMenuClient>
              )}
            />
          }
          menuItemTextMobile={
            typeof linkText === 'string' ? linkText : Plain.serialize(linkText)
          }
          submenuItemsMobile={
            <Repeater
              propName="submenuItems"
              items={submenuItems}
              renderItemWrapper={(item: any) => (
                <ItemMenuClient
                  key={item.key}
                  type="DIV"
                  clickAction="SET_MOBILE_MENU_OPEN_FALSE"
                  refName="NONE"
                >
                  {item}
                </ItemMenuClient>
              )}
            />
          }
        ></HeaderMenuItemClient>
      </div>
    </HeaderMenuItemProvider>
  )
}

HeaderMenuItem.schema = {
  name: 'header-menu-item',
  label: 'Menu Item',
  category: 'layout',
  hideFromAddMenu: true,

  repeaterItems: [
    {
      name: 'submenuItems',
      itemType: 'header-menu-sub-item',
    },
  ],

  getDefaultProps: () => ({
    submenuItems: [],
    linkPath: '/about-us',
    isActive: false,
    linkText: 'About us',
  }),

  sideEditProps: [
    {
      name: 'linkPath',
      label: 'Link to...',
      type: types.SideEditPropType.Text,
    },
  ],
}

export default HeaderMenuItem
