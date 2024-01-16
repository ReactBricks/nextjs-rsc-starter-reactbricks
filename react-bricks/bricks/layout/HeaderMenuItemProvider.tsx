'use client'

import { RefObject, createContext, useContext, useRef, useState } from 'react'

import { HeaderContext } from './HeaderProvider'
import useOnClickOutside from './useClickOutside'

interface IHeaderMenuItemProvider {
  open: boolean
  setOpen: any
  ref: RefObject<HTMLDivElement> | null
}

export const HeaderMenuItemContext = createContext<IHeaderMenuItemProvider>({
  open: false,
  setOpen: () => {},
  ref: null,
})

export default function HeaderMenuItemProvider({ children }: any) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { mobileRef, setMobileMenuOpen } = useContext(HeaderContext)

  useOnClickOutside(ref, () => setOpen(false))
  useOnClickOutside(mobileRef, () => setMobileMenuOpen(false))

  return (
    <HeaderMenuItemContext.Provider
      value={{
        open,
        setOpen,
        ref,
      }}
    >
      {children}
    </HeaderMenuItemContext.Provider>
  )
}
