import { Link, Text, types } from 'react-bricks/rsc'
import { FiChevronRight } from 'react-icons/fi'

import styles from '../../../css/HeaderMenuSubItem.module.css'

interface HeaderMenuSubItemProps {
  linkPath: string
  linkText: types.TextValue
  linkDescription: types.TextValue
}

const HeaderMenuSubItem: types.Brick<HeaderMenuSubItemProps> = ({
  linkPath,
  linkText,
  linkDescription,
}) => {
  return (
    <Link href={linkPath} className={styles.linkContainer}>
      <div className={styles.fiContainer}>
        <FiChevronRight />
      </div>
      <div className={styles.textContainer}>
        <Text
          propName="linkText"
          value={linkText}
          placeholder="Type a text..."
          renderBlock={({ children }) => (
            <div className={styles.linkText}>{children}</div>
          )}
        />
        <div className={styles.descriptionContainer}>
          <Text
            propName="linkDescription"
            value={linkDescription}
            placeholder="Type a text..."
            renderBlock={({ children }) => (
              <div className={styles.linkDescription}>{children}</div>
            )}
          />
        </div>
      </div>
    </Link>
  )
}

HeaderMenuSubItem.schema = {
  name: 'header-menu-sub-item',
  label: 'Submenu Item',
  category: 'layout',
  hideFromAddMenu: true,

  getDefaultProps: () => ({
    linkText: 'Changelog',
    linkDescription: 'Release notes for all React Bricks versions',
    linkPath: '/',
  }),

  sideEditProps: [
    {
      name: 'linkPath',
      label: 'Link to...',
      type: types.SideEditPropType.Text,
    },
  ],
}

export default HeaderMenuSubItem
