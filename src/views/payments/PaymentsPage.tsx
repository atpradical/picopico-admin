import { Page, getNavigationLayout } from '@/shared/ui/layout'

import s from './PaymentsPage.module.scss'

function PaymentsPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.container}>Payments List</div>
    </Page>
  )
}

PaymentsPage.getLayout = getNavigationLayout
export default PaymentsPage
