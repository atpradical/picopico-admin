import { useEffect, useState } from 'react'

import { FollowersTab, FollowingTab } from '@/features/follow/ui'
import { PaymentsTab } from '@/features/payments/ui'
import { TAB_FOLLOWERS, TAB_FOLLOWING, TAB_PAYMENTS, TAB_PHOTOS } from '@/features/users/config'
import { UploadedPhotosTab } from '@/features/users/ui'
import { UserProfileCard } from '@/features/users/ui/user-profile-card'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import {
  ArrowBackOutlineIcon,
  Button,
  ScrollArea,
  ScrollBar,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from '@atpradical/picopico-ui-kit'
import Link from 'next/link'
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
        <Button as={Link} className={s.backButton} href={Paths.Users} variant={'link'}>
          <ArrowBackOutlineIcon />
          {t.userDetailsPage.goBackButton}
        </Button>
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
      </div>
    </Page>
  )
}

UserDetailsPage.getLayout = getNavigationLayout
export default UserDetailsPage
