import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Typography } from '@atpradical/picopico-ui-kit'

import s from './HomePage.module.scss'

const HomePage = () => {
  return (
    <Page>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          SuperAdmin Home Page
        </Typography>
      </div>
    </Page>
  )
}

HomePage.getLayout = getNavigationLayout
export default HomePage
