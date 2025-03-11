import { Page, getNavigationLayout } from '@/shared/ui/layout'

import s from './UsersPage.module.scss'

function UsersPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.test}>Users List</div>
    </Page>
  )
}

UsersPage.getLayout = getNavigationLayout
export default UsersPage
