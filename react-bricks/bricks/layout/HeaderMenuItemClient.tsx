'use client'

import React, { useContext } from 'react'

import styles from '../../../css/HeaderMenuItem.module.css'
import { HeaderMenuItemContext } from './HeaderMenuItemProvider'

interface HeaderMenuItemProps {
  menuItemText: any
  submenuItems: any
  menuItemTextMobile: any
  submenuItemsMobile: any
}

const HeaderMenuItemClient: React.FC<HeaderMenuItemProps> = ({
  menuItemText,
  submenuItems,
  menuItemTextMobile,
  submenuItemsMobile,
}) => {
  // const { mobileRef, setMobileMenuOpen } = useContext(HeaderContext)
  const { ref, open, setOpen } = useContext(HeaderMenuItemContext)

  return (
    <div>
      <div ref={ref} className={styles.containerLinkItemWithSubItems}>
        <button
          className={`${styles.buttonLinkItemWithSubItems} ${
            open ? styles.buttonLinkItemWithSubItemsOpen : ''
          }
        `}
          onClick={() => setOpen((current: any) => !current)}
        >
          {menuItemText}
          {open ? (
            <svg
              viewBox="0 0 14 14"
              width="14px"
              height="14px"
              className={styles.svgClass}
            >
              <path
                d="m7.35 2.9 5.5 5.5a.5.5 0 0 1-.7.7L7 3.96 1.85 9.1a.5.5 0 1 1-.7-.7l5.5-5.5c.2-.2.5-.2.7 0Z"
                fill="currentColor"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 14 14"
              width="14px"
              height="14px"
              className={styles.svgClass}
            >
              <path
                d="m1.15 5.6 5.5 5.5c.2.2.5.2.7 0l5.5-5.5a.5.5 0 0 0-.7-.7L7 10.04 1.85 4.9a.5.5 0 1 0-.7.7Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
        {open && (
          <div className={styles.containerSubmenuItemsOpen}>{submenuItems}</div>
        )}
      </div>

      <div className={styles.containerSubmenuItems} role="group">
        <div className={styles.containerLinkText}>{menuItemTextMobile}</div>
        {submenuItemsMobile}
      </div>
    </div>
  )
}

export default HeaderMenuItemClient
