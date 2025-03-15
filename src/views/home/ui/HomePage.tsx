import { useContext } from 'react'

import { AuthContext } from '@/shared/context'
import { Paths } from '@/shared/enums'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Spinner } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './HomePage.module.scss'

const HomePage = () => {
  const { push } = useRouter()
  const { isAuth } = useContext(AuthContext)

  if (isAuth) {
    void push(Paths.Users)
  }

  return (
    <Page>
      <div className={s.container}>
        <Spinner />
      </div>
    </Page>
  )
}

HomePage.getLayout = getNavigationLayout
export default HomePage
