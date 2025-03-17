import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import client from '@/services/apollo-client'
import { AppMetaDataProvider } from '@/shared/context'
import { useLoader } from '@/shared/hooks'
import { ApolloProvider } from '@apollo/client/react'
import { NextPage } from 'next'

import '@/styles/index.scss'
import '@atpradical/picopico-ui-kit/dist/style.css'

export type NextPageWithLayout<P = object> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ApolloProvider client={client}>
      <AppMetaDataProvider>{getLayout(<Component {...pageProps} />)}</AppMetaDataProvider>
    </ApolloProvider>
  )
}
