import { ComponentPropsWithoutRef } from 'react'

import { TabsContent } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, ...rest }: ProfileDataTabProps) => {
  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      ProfileDataTab
    </TabsContent>
  )
}
