import Link from 'next/link'
import { types } from 'react-bricks/rsc'

import NextLinkClient from './NextLinkClient'

const NextLink: types.RenderLocalLink = ({
  href,
  className,
  activeClassName,
  isAdmin,
  children,
}) => {
  if (isAdmin) {
    return (
      <Link href={href} className={className || ''}>
        {children}
      </Link>
    )
  }

  return (
    <NextLinkClient
      href={href}
      className={className}
      activeClassName={activeClassName}
    >
      {children}
    </NextLinkClient>
  )
}

export default NextLink
