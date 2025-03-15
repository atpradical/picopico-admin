import { PropsWithChildren, ReactElement } from 'react'

import { AuthProvider } from '@/shared/context'
import { HeadMeta, Header } from '@/shared/ui/layout'
import { CustomToastContainer } from '@atpradical/picopico-ui-kit'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <HeadMeta />
      <Header />
      <div className={s.layout}>{children}</div>
      <CustomToastContainer />
    </AuthProvider>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
