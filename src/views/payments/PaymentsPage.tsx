import { paginationSelectOptions } from '@/features/payments/config'
import { PaymentsListTable } from '@/features/payments/ui'
import { usePagination, useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Checkbox, Pagination, TextField, Typography } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './PaymentsPage.module.scss'

function PaymentsPage() {
  // TODO: PAYMENTS Mock array data
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dateLocale = locale === 'ru' ? ru : enUS
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
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          Payments List
        </Typography>
        <div className={s.filtersContainer}>
          <Checkbox className={s.autoUpdateCheckbox} label={t.paymentsPage.autoupdate} />
          <TextField
            label={t.paymentsPage.searchLabel}
            placeholder={t.paymentsPage.searchPlaceholder}
            variant={'search'}
          />
        </div>
        <PaymentsListTable dateLocale={dateLocale} paginatedData={paginatedData} />
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
        <Typography variant={'error'}>Page in development...</Typography>
      </div>
    </Page>
  )
}

PaymentsPage.getLayout = getNavigationLayout
export default PaymentsPage
