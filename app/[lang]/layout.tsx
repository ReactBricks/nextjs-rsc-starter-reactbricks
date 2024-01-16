import {
  PageViewer,
  ReactBricks,
  cleanPage,
  fetchPage,
  getBricks,
  types,
  register,
} from 'react-bricks/rsc'
import ReactBricksAppProvider from '@/app/[lang]/ReactBricksAppProvider'

import ErrorNoFooter from '@/components/errorNoFooter'
import ErrorNoHeader from '@/components/errorNoHeader'
import ErrorNoKeys from '@/components/errorNoKeys'
import PageLayout from '@/components/layout'
import { ThemeProvider } from '@/components/themeProvider'
import { i18n } from '@/i18n-config'
import config from '@/react-bricks/config'

import '@/css/style.css'

export const metadata = {
  title: 'React Bricks Starter',
  description: 'Next.js with Server Components',
}

register(config)

const getData = async (
  locale: string
): Promise<{
  header: types.Page | null
  footer: types.Page | null
  errorNoKeys: boolean
  errorHeader: boolean
  errorFooter: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorHeader: boolean = false
  let errorFooter: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      header: null,
      footer: null,
      errorNoKeys,
      errorHeader,
      errorFooter,
    }
  }

  const [header, footer] = await Promise.all([
    fetchPage({ slug: 'header', language: locale, config }).catch(() => {
      errorHeader = true
      return null
    }),
    fetchPage({ slug: 'footer', language: locale, config }).catch(() => {
      errorFooter = true
      return null
    }),
  ])

  return {
    header,
    footer,
    errorNoKeys,
    errorHeader,
    errorFooter,
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }))
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { header, footer, errorNoKeys, errorHeader, errorFooter } =
    await getData(params.lang)

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks()
  const headerOk = header
    ? cleanPage(header, config.pageTypes || [], bricks)
    : null
  const footerOk = footer
    ? cleanPage(footer, config.pageTypes || [], bricks)
    : null

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={`dark:bg-gray-900`}>
        <ThemeProvider
          attribute="class"
          storageKey="color-mode"
          enableSystem={false}
          defaultTheme="light"
        >
          <main>
            <ReactBricksAppProvider>
              <PageLayout>
                {!errorNoKeys && (
                  <>
                    {headerOk && !errorHeader ? (
                      <PageViewer
                        page={headerOk}
                        showClickToEdit={false}
                        main={false}
                      />
                    ) : (
                      <ErrorNoHeader />
                    )}
                    {children}
                    {footerOk && !errorFooter ? (
                      <PageViewer
                        page={footerOk}
                        showClickToEdit={false}
                        main={false}
                      />
                    ) : (
                      <ErrorNoFooter />
                    )}
                  </>
                )}
                {errorNoKeys && <ErrorNoKeys />}
              </PageLayout>
            </ReactBricksAppProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
