import { Page, getNavigationLayout } from '@/shared/ui/layout'

import s from './HomePage.module.scss'

const HomePage = () => {
  return (
    <Page>
      <div className={s.container}>SuperAdmin HomePage</div>
    </Page>
  )
}

HomePage.getLayout = getNavigationLayout
export default HomePage
