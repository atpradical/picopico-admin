import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Typography } from '@atpradical/picopico-ui-kit'

import s from './StatisticsPage.module.scss'

function StatisticsPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          Statistics Data
        </Typography>
        <Typography variant={'error'}>Page in development...</Typography>
      </div>
    </Page>
  )
}

StatisticsPage.getLayout = getNavigationLayout
export default StatisticsPage
