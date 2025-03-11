import { ComponentPropsWithoutRef } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { useTranslation } from '@/shared/hooks'
import { Pagination, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './FollowersTab.module.scss'

type FollowersTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const FollowersTab = ({ className, ...rest }: FollowersTabProps) => {
  const { t } = useTranslation()

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Followers Data
      </Typography>
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
    </TabsContent>
  )
}
