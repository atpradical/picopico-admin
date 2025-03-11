import { Page, getNavigationLayout } from '@/shared/ui/layout'

import s from './StatisticsPage.module.scss'

function StatisticsPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.test}>Statistics Data</div>
    </Page>
  )
}

StatisticsPage.getLayout = getNavigationLayout
export default StatisticsPage
