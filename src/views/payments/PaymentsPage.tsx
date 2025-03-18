import { ChangeEvent, useContext } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { PaymentsListTable } from '@/features/payments/ui'
import { useGetPaymentsQuery } from '@/services/payments'
import { InputMaybe, QueryGetUsersArgs, SortDirection } from '@/services/schema.types'
import { AuthContext } from '@/shared/context'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_COUNT,
  usePagination,
  useTranslation,
} from '@/shared/hooks'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Checkbox, Pagination, Spinner, TextField } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { useDebounceCallback } from 'usehooks-ts'

import s from './PaymentsPage.module.scss'

function PaymentsPage() {
  const { t } = useTranslation()
  const { isReady, locale, query } = useRouter()
  const { isAuth } = useContext(AuthContext)
  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()

  const dateLocale = locale === 'ru' ? ru : enUS
  const searchTerm = query.searchTerm ? query.searchTerm : ''
  const pageSize = query.pageSize ? query.pageSize : DEFAULT_PAGE_SIZE
  const pageNumber = query.pageNumber ? query.pageNumber : DEFAULT_PAGE
  const sortBy = query.sortBy ? query.sortBy : ''
  const sortDirection = query.sortDirection ? query.sortDirection : ''

  const debouncedSearch = useDebounceCallback((value: string) => {
    addRouterQueryParamShallow({ pageNumber: DEFAULT_PAGE.toString(), searchTerm: value })
  }, 500)

  const usersSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.currentTarget.value)
  }

  const clearSearchHandler = () => {
    addRouterQueryParamShallow({ searchTerm: '' })
  }

  const changeSortTableHandler = (sortBy: string, sortDirection: string) => {
    addRouterQueryParamShallow({ pageNumber: DEFAULT_PAGE.toString(), sortBy, sortDirection })
  }

  const { data, loading } = useGetPaymentsQuery({
    fetchPolicy: 'network-only',
    skip: !isReady || !isAuth,
    variables: {
      pageNumber: +pageNumber as InputMaybe<QueryGetUsersArgs['pageNumber']>,
      pageSize: +pageSize as InputMaybe<QueryGetUsersArgs['pageSize']>,
      searchTerm: searchTerm as InputMaybe<QueryGetUsersArgs['searchTerm']>,
      ...(sortBy && { sortBy: sortBy as InputMaybe<QueryGetUsersArgs['sortBy']> }),

      ...(sortDirection && {
        sortDirection: sortDirection as InputMaybe<QueryGetUsersArgs['sortDirection']>,
      }),
    },
  })

  const { changePage, changePageSize, nextPage, prevPage } = usePagination({
    page: data?.getPayments.page ?? DEFAULT_PAGE,
  })

  if (!isAuth) {
    return (
      <div className={s.container}>
        <Spinner label={t.loading} />
      </div>
    )
  }

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <div className={s.filtersContainer}>
          <Checkbox className={s.autoUpdateCheckbox} label={t.paymentsPage.autoupdate} />
          <TextField
            label={t.paymentsPage.searchLabel}
            onChange={usersSearchHandler}
            onClear={clearSearchHandler}
            placeholder={t.paymentsPage.searchPlaceholder}
            variant={'search'}
          />
        </div>
        <PaymentsListTable
          dateLocale={dateLocale}
          items={data?.getPayments.items}
          onTableSort={changeSortTableHandler}
          sortBy={sortBy as SortDirection}
          sortDirection={sortDirection as SortDirection}
        />
        {loading && <Spinner label={t.loading} />}
        <Pagination
          currentPage={data?.getPayments.page ?? DEFAULT_PAGE}
          onNextPage={nextPage}
          onPageChange={changePage}
          onPrevPage={prevPage}
          onSelectValueChange={changePageSize}
          pageSize={+pageSize}
          selectOptions={paginationSelectOptions}
          textPerPage={t.pagination.textPerPage}
          textShow={t.pagination.textShow}
          totalCount={data?.getPayments.totalCount ?? DEFAULT_TOTAL_COUNT}
        />
      </div>
    </Page>
  )
}

PaymentsPage.getLayout = getNavigationLayout
export default PaymentsPage
