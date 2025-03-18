import { ComponentPropsWithoutRef } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { PaymentsUserTable } from '@/features/payments/ui'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_COUNT,
  usePagination,
  useTranslation,
} from '@/shared/hooks'
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

  const { changePage, changePageSize, nextPage, prevPage } = usePagination({
    page: DEFAULT_PAGE,
  })

  return (
    <TabsContent className={s.container} {...props}>
      {paymentHistory && paymentHistory.length ? (
        <>
          <div className={s.tableContainer}>
            {/*<PaymentsUserTableMobile dateLocale={dateLocale} paginatedData={paginatedData} />*/}
            <PaymentsUserTable dateLocale={dateLocale} paginatedData={[]} />
          </div>
          <Pagination
            currentPage={DEFAULT_PAGE}
            onNextPage={nextPage}
            onPageChange={changePage}
            onPrevPage={prevPage}
            onSelectValueChange={changePageSize}
            pageSize={DEFAULT_PAGE_SIZE}
            selectOptions={paginationSelectOptions}
            textPerPage={t.pagination.textPerPage}
            textShow={t.pagination.textShow}
            totalCount={DEFAULT_TOTAL_COUNT}
          />
        </>
      ) : (
        <Typography className={s.noPaymentHistoryText} grey variant={'h3'}>
          {t.paymentsTab.noData}
        </Typography>
      )}
    </TabsContent>
  )
}
