import { useEffect, useState } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { TAB_FOLLOWERS, TAB_FOLLOWING, TAB_PAYMENTS, TAB_PHOTOS } from '@/features/users/config'
import { FollowersTab, FollowingTab, PaymentsTab, UploadedPhotosTab } from '@/features/users/ui'
import { UserProfileCard } from '@/features/users/ui/user-profile-card'
import { useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import {
  Pagination,
  ScrollArea,
  ScrollBar,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './UserDetailsPage.module.scss'

function UserDetailsPage() {
  const { t } = useTranslation()
  const { isReady } = useRouter()
  const [activeTab, setActiveTab] = useState(TAB_PHOTOS)

  useEffect(() => {
    if (isReady) {
      const tab = sessionStorage.getItem('activeTab') || TAB_PHOTOS

      setActiveTab(tab)
    }
  }, [isReady])

  const onTabChangeHandler = async (tabValue: string) => {
    setActiveTab(tabValue)
    sessionStorage.setItem('activeTab', tabValue)
  }

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          User Details Page
        </Typography>
        <UserProfileCard />
        <TabsRoot className={s.tabsRoot} onValueChange={onTabChangeHandler} value={activeTab}>
          <ScrollArea>
            <TabsList>
              <TabsTrigger value={TAB_PHOTOS}>{t.userDetailsPage.tabNames.photos}</TabsTrigger>
              <TabsTrigger value={TAB_PAYMENTS}>{t.userDetailsPage.tabNames.payments}</TabsTrigger>
              <TabsTrigger value={TAB_FOLLOWERS}>
                {t.userDetailsPage.tabNames.followers}
              </TabsTrigger>
              <TabsTrigger value={TAB_FOLLOWING}>
                {t.userDetailsPage.tabNames.following}
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation={'horizontal'} />
          </ScrollArea>
          <UploadedPhotosTab value={TAB_PHOTOS} />
          <PaymentsTab value={TAB_PAYMENTS} />
          <FollowersTab value={TAB_FOLLOWERS} />
          <FollowingTab value={TAB_FOLLOWING} />
        </TabsRoot>
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
