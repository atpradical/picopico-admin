import { ComponentPropsWithoutRef } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { useTranslation } from '@/shared/hooks'
import { Pagination, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './PaymentsTab.module.scss'

type PaymentsTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const PaymentsTab = ({ className, ...rest }: PaymentsTabProps) => {
  const { t } = useTranslation()

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Payments Data
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
