import { Repeater, Text, types } from 'react-bricks/rsc'

import styles from '../../../css/FooterColumn.module.css'

interface FooterColumnProps {
  title: types.TextValue
  links: types.RepeaterItems
}

const FooterColumn: types.Brick<FooterColumnProps> = ({ title, links }) => {
  return (
    <div className={styles.container}>
      <Text
        propName="title"
        value={title}
        placeholder="Title..."
        renderBlock={({ children }) => (
          <div className={styles.text}>{children}</div>
        )}
      />
      <Repeater propName="links" items={links} />
    </div>
  )
}

FooterColumn.schema = {
  name: 'footer-column',
  label: 'Column',
  category: 'layout',
  hideFromAddMenu: true,
  // tags: [],
  repeaterItems: [
    {
      name: 'links',
      itemType: 'footer-link',
    },
  ],

  // Defaults when a new brick is added
  getDefaultProps: () => ({
    title: 'Features',
  }),

  // Sidebar Edit controls for props
  sideEditProps: [],
}

export default FooterColumn
