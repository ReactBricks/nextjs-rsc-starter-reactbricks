import { types } from 'react-bricks/rsc'

import NextLinkClient from './NextLinkClient'

const NextLink: types.RenderLocalLink = ({
  href,
  target,
  rel,
  className,
  activeClassName,
  children,
}) => {

  return (
    <NextLinkClient
      href={href}
      target={target}
      rel={rel}
      className={className}
      activeClassName={activeClassName}
    >
      {children}
    </NextLinkClient>
  )
}

export default NextLink
