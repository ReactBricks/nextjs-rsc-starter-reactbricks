'use client'

import { RefObject, createContext, useEffect, useRef, useState } from 'react'
import useOnClickOutside from './useClickOutside'

interface IHeaderProvider {
  mobileMenuOpen: boolean
  setMobileMenuOpen: any
  mounted: boolean
  setMounted: (value: boolean) => void
  mobileRef: RefObject<HTMLDivElement | null> | null
}

export const HeaderContext = createContext<IHeaderProvider>({
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
  mounted: false,
  setMounted: () => {},
  mobileRef: null,
})

export default function HeaderProvider({ children }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // const { isDarkColorMode, toggleColorMode } = useReactBricksContext()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mobileRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(mobileRef, () => setMobileMenuOpen(false))

  return (
    <HeaderContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        mounted,
        setMounted,
        mobileRef,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
