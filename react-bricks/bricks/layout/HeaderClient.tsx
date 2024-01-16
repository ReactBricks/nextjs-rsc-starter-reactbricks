'use client'

import { useTheme } from 'next-themes'
import { useContext } from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { FiMenu, FiX } from 'react-icons/fi'

import styles from '../../../css/Header.module.css'
import { HeaderContext } from './HeaderProvider'

interface IHeaderClientProps {
  menuItems: any
}

const HeaderClient: React.FC<IHeaderClientProps> = ({ menuItems }) => {
  const { mounted, mobileRef, mobileMenuOpen, setMobileMenuOpen } =
    useContext(HeaderContext)
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* DARK MODE BUTTON MOBILE */}
      {mounted && (
        <button
          type="button"
          className={styles.darkModeButton}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'light' ? (
            <BsMoonFill />
          ) : (
            <BsSunFill style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }} />
          )}
        </button>
      )}

      <div className={styles.containerHamburgerMenu}>
        <button
          className={styles.buttonHamburgerMenu}
          onClick={() => setMobileMenuOpen((current: any) => !current)}
        >
          {mobileMenuOpen ? (
            <FiX size={18} className={styles.hamburgerMenuFiX} />
          ) : (
            <FiMenu size={20} className={styles.hamburgerMenuFiMenu} />
          )}
        </button>
        {mobileMenuOpen && (
          <div className={styles.containerHamburgerMenuItems}>{menuItems}</div>
        )}
      </div>
    </>
  )
}

export default HeaderClient
