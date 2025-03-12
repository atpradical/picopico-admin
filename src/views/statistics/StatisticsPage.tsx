import { useEffect, useState } from 'react'

import { TAB_POSTS, TAB_USERS } from '@/features/statistics/config'
import { UserStatTab } from '@/features/statistics/ui'
import { PostsStatTab } from '@/features/statistics/ui/posts-stat-tab'
import { TAB_PHOTOS } from '@/features/users/config'
import { useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import {
  ScrollArea,
  ScrollBar,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './StatisticsPage.module.scss'

function StatisticsPage() {
  const { t } = useTranslation()
  const { isReady } = useRouter()
  const [activeTab, setActiveTab] = useState(TAB_USERS)

  useEffect(() => {
    if (isReady) {
      const tab = sessionStorage.getItem('activeStatTab') || TAB_PHOTOS

      setActiveTab(tab)
    }
  }, [isReady])

  const onTabChangeHandler = async (tabValue: string) => {
    setActiveTab(tabValue)
    sessionStorage.setItem('activeStatTab', tabValue)
  }

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          Statistics Data
        </Typography>
        <TabsRoot className={s.tabsRoot} onValueChange={onTabChangeHandler} value={activeTab}>
          <ScrollArea>
            <TabsList>
              <TabsTrigger value={TAB_USERS}>{t.statisticsPage.tabNames.users}</TabsTrigger>
              <TabsTrigger value={TAB_POSTS}>{t.statisticsPage.tabNames.posts}</TabsTrigger>
            </TabsList>
            <ScrollBar orientation={'horizontal'} />
          </ScrollArea>
          <UserStatTab value={TAB_USERS} />
          <PostsStatTab value={TAB_POSTS} />
        </TabsRoot>
        <Typography variant={'error'}>Page in development...</Typography>
      </div>
    </Page>
  )
}

StatisticsPage.getLayout = getNavigationLayout
export default StatisticsPage
