import { ComponentPropsWithoutRef } from 'react'

import { TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './FollowersTab.module.scss'

type FollowersTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const FollowersTab = ({ className, ...rest }: FollowersTabProps) => {
  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Followers Data
      </Typography>
    </TabsContent>
  )
}
