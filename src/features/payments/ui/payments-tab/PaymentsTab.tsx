import { ComponentPropsWithoutRef, useContext } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { PaymentsUserTable } from '@/features/payments/ui'
import { useGetPaymentsByUserQuery } from '@/services/payments'
import { InputMaybe, QueryGetPaymentsByUserArgs } from '@/services/schema.types'
import { AuthContext } from '@/shared/context'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_COUNT,
  usePagination,
  useTranslation,
} from '@/shared/hooks'
import { Pagination, Spinner, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './PaymentsTab.module.scss'

type AccountManagementTabProps = {
  tableProps?: ComponentPropsWithoutRef<'table'>
} & ComponentPropsWithoutRef<typeof TabsContent>

export const PaymentsTab = ({ tableProps, ...props }: AccountManagementTabProps) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { locale, query } = useRouter()

  const dateLocale = locale === 'ru' ? ru : enUS

  const userId = query.id ? query.id : ''
  const pageSize = query.pageSize ? query.pageSize : DEFAULT_PAGE_SIZE
  const pageNumber = query.pageNumber ? query.pageNumber : DEFAULT_PAGE

  const { data, loading } = useGetPaymentsByUserQuery({
    // TODO: GRAPHQL обработка ошибок
    fetchPolicy: 'network-only',
    skip: !isAuth,
    variables: {
      pageNumber: +pageNumber as InputMaybe<QueryGetPaymentsByUserArgs['pageNumber']>,
      pageSize: +pageSize as InputMaybe<QueryGetPaymentsByUserArgs['pageSize']>,
      userId: +userId as QueryGetPaymentsByUserArgs['userId'],
    },
  })

  const { changePage, changePageSize, nextPage, prevPage } = usePagination({
    page: data?.getPaymentsByUser.page ?? DEFAULT_PAGE,
  })

  const isDataToDisplay = data?.getPaymentsByUser.items.length ?? 0 > 0

  return (
    <TabsContent className={s.container} {...props}>
      {isDataToDisplay && (
        <>
          <div className={s.tableContainer}>
            {/*<PaymentsUserTableMobile dateLocale={dateLocale} paginatedData={paginatedData} />*/}
            <PaymentsUserTable dateLocale={dateLocale} items={data?.getPaymentsByUser.items} />
          </div>
          {loading && <Spinner label={t.loading} />}
          <Pagination
            currentPage={data?.getPaymentsByUser.page ?? DEFAULT_PAGE}
            onNextPage={nextPage}
            onPageChange={changePage}
            onPrevPage={prevPage}
            onSelectValueChange={changePageSize}
            pageSize={+pageSize}
            selectOptions={paginationSelectOptions}
            textPerPage={t.pagination.textPerPage}
            textShow={t.pagination.textShow}
            totalCount={data?.getPaymentsByUser.totalCount ?? DEFAULT_TOTAL_COUNT}
          />
        </>
      )}
      {!isDataToDisplay && (
        <Typography className={s.noPaymentHistoryText} grey variant={'h3'}>
          {t.paymentsTab.noData}
        </Typography>
      )}
    </TabsContent>
  )
}
