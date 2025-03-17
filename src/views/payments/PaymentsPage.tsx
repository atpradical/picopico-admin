import { paginationSelectOptions } from '@/features/payments/config'
import { PaymentsListTable } from '@/features/payments/ui'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_COUNT,
  usePagination,
  useTranslation,
} from '@/shared/hooks'
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
  // const paymentHistory: any[] = [{}, {}, {}]

  const { changePage, changePageSize, nextPage, prevPage } = usePagination({
    pagination: {
      __typename: 'PaginationModel',
      page: 1,
      pageSize: 100,
      pagesCount: 1,
      totalCount: 1,
    },
  })

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <div className={s.filtersContainer}>
          <Checkbox className={s.autoUpdateCheckbox} label={t.paymentsPage.autoupdate} />
          <TextField
            label={t.paymentsPage.searchLabel}
            placeholder={t.paymentsPage.searchPlaceholder}
            variant={'search'}
          />
        </div>
        <PaymentsListTable dateLocale={dateLocale} paginatedData={[]} />
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
        <Typography variant={'error'}>Page in development...</Typography>
      </div>
    </Page>
  )
}

PaymentsPage.getLayout = getNavigationLayout
export default PaymentsPage
