import { UserProfileCard } from '@/features/users/ui/user-profile-card'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Typography } from '@atpradical/picopico-ui-kit'

import s from './UserDetailsPage.module.scss'

function UserDetailsPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          User Details Page
        </Typography>
        <UserProfileCard />
      </div>
    </Page>
  )
}

UserDetailsPage.getLayout = getNavigationLayout
export default UserDetailsPage
