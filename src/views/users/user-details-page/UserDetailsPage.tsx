import { paginationSelectOptions } from '@/features/payments/config'
import { UserProfileCard } from '@/features/users/ui/user-profile-card'
import { useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Pagination, Typography } from '@atpradical/picopico-ui-kit'

import s from './UserDetailsPage.module.scss'

function UserDetailsPage() {
  const { t } = useTranslation()

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          User Details Page
        </Typography>
        <UserProfileCard />
        <Pagination
          currentPage={1}
          onNextPage={() => {}}
          onPageChange={() => {}}
          onPrevPage={() => {}}
          onSelectValueChange={() => {}}
          pageSize={100}
          selectOptions={paginationSelectOptions}
          textPerPage={t.profileSettings.paymentsTab.pagination.textPerPage}
          textShow={t.profileSettings.paymentsTab.pagination.textShow}
          totalCount={10000}
        />
      </div>
    </Page>
  )
}

UserDetailsPage.getLayout = getNavigationLayout
export default UserDetailsPage
