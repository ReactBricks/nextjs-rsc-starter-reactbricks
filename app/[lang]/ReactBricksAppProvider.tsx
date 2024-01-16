'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { register } from 'react-bricks/rsc'
import { ReactBricksClientProvider } from 'react-bricks/rsc/client'

import NextLink from '@/react-bricks/NextLink'
import config from '@/react-bricks/config'

export default function ReactBricksApp({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const reactBricksConfig = {
    ...config,
    navigate: (path: string) => {
      router.push(path)
    },
    renderLocalLink: NextLink,
  }

  register(reactBricksConfig)

  return (
    <ReactBricksClientProvider
      bricks={reactBricksConfig.bricks}
      pageTypes={reactBricksConfig.pageTypes}
      enableDefaultEmbedBrick={!!reactBricksConfig.enableDefaultEmbedBrick}
    >
      {children as any}
    </ReactBricksClientProvider>
  )
}
