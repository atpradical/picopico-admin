import { ComponentPropsWithoutRef } from 'react'

import { TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './UserStatTab.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsContent>
export const UserStatTab = ({ className, ...rest }: Props) => {
  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        User Tab Data
      </Typography>
      <section>
        <Typography>User Graphics details</Typography>
      </section>
    </TabsContent>
  )
}
