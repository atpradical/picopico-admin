import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Typography } from '@atpradical/picopico-ui-kit'

import s from './PaymentsPage.module.scss'

function PaymentsPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          Payments List
        </Typography>
        <Typography variant={'error'}>Page in development...</Typography>
      </div>
    </Page>
  )
}

PaymentsPage.getLayout = getNavigationLayout
export default PaymentsPage
