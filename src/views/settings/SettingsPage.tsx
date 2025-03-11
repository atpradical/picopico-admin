import { useContext, useEffect, useState } from 'react'

import { DevicesTab } from '@/features/devices/ui'
import { AccountManagementTab, PaymentsTab } from '@/features/payments/ui'
import { ProfileDataTab } from '@/features/profile/ui/settings'
import { useGetSessionsQuery } from '@/services/devices'
import { AuthContext, MyProfileContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { ScrollArea, ScrollBar, TabsList, TabsRoot, TabsTrigger } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'
import { useIsClient } from 'usehooks-ts'

import s from './SettingsPage.module.scss'

const TAB_PROFILE_DATA = 'general'
const TAB_DEVICES = 'devices'
const TAB_ACCOUNT = 'account'
const TAB_PAYMENTS = 'payments'

function SettingsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuth } = useContext(AuthContext)
  const isClient = useIsClient()
  const { myProfileData } = useContext(MyProfileContext)
  const { data: sessionsData, refetch } = useGetSessionsQuery()
  const [activeTab, setActiveTab] = useState(TAB_PROFILE_DATA)

  useEffect(() => {
    if (router.isReady) {
      const tab = sessionStorage.getItem('activeTab') || TAB_PROFILE_DATA

      setActiveTab(tab)
    }
  }, [router.isReady])

  const onTabChangeHandler = async (tabValue: string) => {
    setActiveTab(tabValue)
    sessionStorage.setItem('activeTab', tabValue)

    if (tabValue === TAB_DEVICES) {
      await refetch()
    }
  }

  if (!isAuth) {
    isClient && router.push(Paths.logIn)

    return null
  }

  return (
    <Page pt={'36px'}>
      <TabsRoot className={s.tabsRoot} onValueChange={onTabChangeHandler} value={activeTab}>
        <ScrollArea>
          <TabsList>
            <TabsTrigger value={TAB_PROFILE_DATA}>
              {t.profileSettings.tabNames.generalInformation}
            </TabsTrigger>
            <TabsTrigger value={TAB_DEVICES}>{t.profileSettings.tabNames.devices}</TabsTrigger>
            <TabsTrigger value={TAB_ACCOUNT}>
              {t.profileSettings.tabNames.accountManagement}
            </TabsTrigger>
            <TabsTrigger value={TAB_PAYMENTS}>{t.profileSettings.tabNames.payments}</TabsTrigger>
          </TabsList>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
        {myProfileData && <ProfileDataTab myProfileData={myProfileData} value={TAB_PROFILE_DATA} />}
        {sessionsData && <DevicesTab data={sessionsData} value={TAB_DEVICES} />}
        <AccountManagementTab value={TAB_ACCOUNT} />
        <PaymentsTab value={TAB_PAYMENTS} />
      </TabsRoot>
    </Page>
  )
}

SettingsPage.getLayout = getNavigationLayout
export default SettingsPage
