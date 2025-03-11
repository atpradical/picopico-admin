import { ComponentPropsWithoutRef } from 'react'

import { TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './FollowingTab.module.scss'

type FollowingTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const FollowingTab = ({ className, ...rest }: FollowingTabProps) => {
  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Following Data
      </Typography>
    </TabsContent>
  )
}
