import { ComponentPropsWithoutRef } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { PaymentsTable } from '@/features/payments/ui'
import { usePagination, useTranslation } from '@/shared/hooks'
import { Pagination, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './PaymentsTab.module.scss'

type AccountManagementTabProps = {
  tableProps?: ComponentPropsWithoutRef<'table'>
} & ComponentPropsWithoutRef<typeof TabsContent>

export const PaymentsTab = ({ tableProps, ...props }: AccountManagementTabProps) => {
  const { t } = useTranslation()

  const { locale } = useRouter()
  const dateLocale = locale === 'ru' ? ru : enUS

  // TODO: PAYMENTS Mock array data
  const paymentHistory: any[] = [{}, {}, {}]

  const {
    changePage,
    changePageSize,
    currentPage,
    nextPage,
    pageSize,
    paginatedData,
    prevPage,
    totalCount,
  } = usePagination({ data: paymentHistory })

  return (
    <TabsContent className={s.container} {...props}>
      {paymentHistory && paymentHistory.length ? (
        <>
          <div className={s.tableContainer}>
            {/*<PaymentsTableMobile dateLocale={dateLocale} paginatedData={paginatedData} />*/}
            <PaymentsTable dateLocale={dateLocale} paginatedData={paginatedData} />
          </div>
          <Pagination
            currentPage={currentPage}
            onNextPage={nextPage}
            onPageChange={changePage}
            onPrevPage={prevPage}
            onSelectValueChange={changePageSize}
            pageSize={pageSize}
            selectOptions={paginationSelectOptions}
            textPerPage={t.pagination.textPerPage}
            textShow={t.pagination.textShow}
            totalCount={totalCount}
          />
        </>
      ) : (
        <Typography className={s.noPaymentHistoryText} grey variant={'h3'}>
          {t.profileSettings.paymentsTab.noPayments}
        </Typography>
      )}
    </TabsContent>
  )
}
