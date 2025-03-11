import { ComponentPropsWithoutRef } from 'react'

import { TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './PaymentsTab.module.scss'

type PaymentsTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const PaymentsTab = ({ className, ...rest }: PaymentsTabProps) => {
  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Payments Data
      </Typography>
    </TabsContent>
  )
}
