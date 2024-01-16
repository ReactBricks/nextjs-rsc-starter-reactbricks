'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { types } from 'react-bricks/rsc'

const NextLinkClient: types.RenderLocalLink = ({
  href,
  className,
  activeClassName,
  children,
}) => {
  const pathname = usePathname()

  let anchorClassName = ''

  if (pathname === href) {
    anchorClassName = `${className} ${activeClassName}`
  } else {
    anchorClassName = className || ''
  }

  return (
    <Link href={href} className={anchorClassName}>
      {children}
    </Link>
  )
}

export default NextLinkClient
