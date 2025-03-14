import type { Metadata } from 'next'
import {
  JsonLd,
  PageViewer,
  cleanPage,
  fetchPagePreview,
  getBricks,
  getMetadata,
  types,
} from 'react-bricks/rsc'
import { ClickToEdit } from 'react-bricks/rsc/client'

import ErrorNoKeys from '@/components/errorNoKeys'
import ErrorNoPage from '@/components/errorNoPage'
import config from '@/react-bricks/config'

export const dynamic = 'force-dynamic'

const getData = async (
  token?: string
): Promise<{
  page: types.Page | null
  errorNoKeys: boolean
  errorPage: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    return {
      page: null,
      errorNoKeys: true,
      errorPage,
    }
  }

  if (!token) {
    return {
      page: null,
      errorNoKeys,
      errorPage: true,
    }
  }

  const page = await fetchPagePreview({
    token,
    config,
    fetchOptions: { cache: 'no-store' },
  }).catch(() => {
    errorPage = true
    return null
  })

  return {
    page,
    errorNoKeys,
    errorPage,
  }
}

export async function generateMetadata(props: {
  searchParams: Promise<{ p?: string }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const { page } = await getData(searchParams.p)
  if (!page?.meta) {
    return {}
  }

  return getMetadata(page)
}

export default async function Page(props: {
  searchParams: Promise<{ p?: string }>
}) {
  const searchParams = await props.searchParams
  const { page, errorNoKeys, errorPage } = await getData(searchParams.p)

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks()
  const pageOk = page ? cleanPage(page, config.pageTypes || [], bricks) : null

  return (
    <>
      {page?.meta && <JsonLd page={page}></JsonLd>}
      {pageOk && !errorPage && !errorNoKeys && (
        <PageViewer page={pageOk} main />
      )}
      {errorNoKeys && <ErrorNoKeys />}
      {errorPage && <ErrorNoPage />}
      {pageOk && config && (
        <ClickToEdit
          pageId={pageOk?.id}
          language={pageOk.language}
          editorPath={config.editorPath || '/admin/editor'}
          clickToEditSide={config.clickToEditSide}
        />
      )}
    </>
  )
}
