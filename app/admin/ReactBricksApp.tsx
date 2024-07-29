'use client'

import { useRouter } from 'next/navigation'
import { Nunito_Sans } from 'next/font/google'
import { useState } from 'react'
import { ReactBricks } from 'react-bricks'

import NextLink from '@/react-bricks/NextLink'
import config from '@/react-bricks/config'

import { useTheme } from 'next-themes'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-nunito',
})

export default function ReactBricksApp({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // Color Mode Management
  const savedColorMode =
    typeof window === 'undefined' ? '' : localStorage.getItem('color-mode')

  const [colorMode, setColorMode] = useState(savedColorMode || 'light')

  const { setTheme } = useTheme()

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light'
    setColorMode(newColorMode)
    localStorage.setItem('color-mode', newColorMode)

    setTheme(newColorMode)
  }

  const reactBricksConfig = {
    ...config,
    navigate: (path: string) => {
      router.push(path)
    },
    renderLocalLink: NextLink,
    isDarkColorMode: colorMode === 'dark',
    toggleColorMode,
    contentClassName: `antialiased font-content ${nunito.className} ${colorMode} ${
      colorMode === 'dark' ? 'darkContentClass' : 'whiteContentClass'
    }`,
  }

  return <ReactBricks {...reactBricksConfig}>{children as any}</ReactBricks>
}
