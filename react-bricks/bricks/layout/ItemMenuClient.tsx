'use client'

import React, { useContext } from 'react'
import { HeaderContext } from './HeaderProvider'
import { HeaderMenuItemContext } from './HeaderMenuItemProvider'

interface IItemMenuClient {
  type: 'DIV' | 'BUTTON'
  children: any
  clickAction: 'SET_MOBILE_MENU_OPEN_FALSE' | 'SET_OPEN' | 'NONE'
  className?: string
  refName: 'NONE' | 'REF' | 'MOBILE_REF'
}

export const ItemMenuClient: React.FC<IItemMenuClient> = ({
  type,
  children,
  clickAction,
  className,
  refName,
}) => {
  const { mobileRef, setMobileMenuOpen } = useContext(HeaderContext)
  const { ref, setOpen } = useContext(HeaderMenuItemContext)

  let onClick = () => {}
  let currentRef: any

  if (refName === 'REF') {
    currentRef = ref
  } else if (refName === 'MOBILE_REF') {
    currentRef = mobileRef
  }

  switch (clickAction) {
    case 'SET_MOBILE_MENU_OPEN_FALSE':
      onClick = () => setMobileMenuOpen(false)
      break

    case 'SET_OPEN':
      onClick = () => setOpen((current: any) => !current)
      break

    default:
      break
  }

  if (type === 'BUTTON') {
    return (
      <button ref={currentRef} className={className || ''} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <div ref={currentRef} className={className || ''} onClick={onClick}>
      {children}
    </div>
  )
}
