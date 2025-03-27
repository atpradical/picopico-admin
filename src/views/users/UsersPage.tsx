import { useContext, useMemo } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { UsersTable } from '@/features/users/ui'
import { InputMaybe, QueryGetUsersArgs, SortDirection } from '@/services/schema.types'
import { useGetUsersQuery } from '@/services/users/query'
import { AuthContext } from '@/shared/context'
import { UserBlockStatus } from '@/shared/enums/user-block-status'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_COUNT,
  usePagination,
  useSearch,
  useTranslation,
} from '@/shared/hooks'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Pagination, Select, Spinner, TextField } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './UsersPage.module.scss'

function UsersPage() {
  const { t } = useTranslation()
  const { isReady, locale, query } = useRouter()
  const { isAuth } = useContext(AuthContext)
  const { clearSearchHandler, searchChangeHandler } = useSearch()
  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()

  const dateLocale = locale === 'ru' ? ru : enUS
  const searchTerm = query.searchTerm ? query.searchTerm : ''
  const statusFilter = query.statusFilter ? query.statusFilter : UserBlockStatus.ALL
  const pageSize = query.pageSize ? query.pageSize : DEFAULT_PAGE_SIZE
  const pageNumber = query.pageNumber ? query.pageNumber : DEFAULT_PAGE
  const sortBy = query.sortBy ? query.sortBy : ''
  const sortDirection = query.sortDirection ? query.sortDirection : ''

  const usersStatusOptions = useMemo(() => {
    return [
      { label: t.usersPage.userBlockStatus.all, value: UserBlockStatus.ALL },
      { label: t.usersPage.userBlockStatus.blocked, value: UserBlockStatus.BLOCKED },
      { label: t.usersPage.userBlockStatus.active, value: UserBlockStatus.UNBLOCKED },
    ]
  }, [t])

  const userStatusFilterHandler = (value: string) => {
    addRouterQueryParamShallow({ pageNumber: DEFAULT_PAGE.toString(), statusFilter: value })
  }

  const changeSortTableHandler = (sortBy: string, sortDirection: string) => {
    addRouterQueryParamShallow({ pageNumber: DEFAULT_PAGE.toString(), sortBy, sortDirection })
  }

  const { data, loading } = useGetUsersQuery({
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

      statusFilter: statusFilter as string as InputMaybe<QueryGetUsersArgs['statusFilter']>,
    },
  })

  const { changePage, changePageSize, nextPage, prevPage } = usePagination({
    page: data?.getUsers.pagination.page ?? DEFAULT_PAGE,
  })

  if (!isAuth) {
    return (
      <div className={s.container}>
        <Spinner label={t.loading} />
      </div>
    )
  }

  return (
    <Page pt={'60px'}>
      <div className={s.container}>
        <div className={s.searchContainer}>
          <TextField
            label={t.usersPage.filtersLabels.searchTerm}
            onChange={searchChangeHandler}
            onClear={clearSearchHandler}
            value={searchTerm}
            variant={'search'}
          />
          <Select
            className={s.filterSelect}
            defaultValue={UserBlockStatus.ALL}
            label={t.usersPage.filtersLabels.statusSelect}
            onValueChange={userStatusFilterHandler}
            options={usersStatusOptions}
          />
        </div>
        <UsersTable
          dateLocale={dateLocale}
          items={data?.getUsers.users}
          onTableSort={changeSortTableHandler}
          sortBy={sortBy as SortDirection}
          sortDirection={sortDirection as SortDirection}
        />
        {loading && <Spinner label={t.loading} />}
        <Pagination
          currentPage={data?.getUsers.pagination.page ?? DEFAULT_PAGE}
          onNextPage={nextPage}
          onPageChange={changePage}
          onPrevPage={prevPage}
          onSelectValueChange={changePageSize}
          pageSize={+pageSize}
          selectOptions={paginationSelectOptions}
          textPerPage={t.pagination.textPerPage}
          textShow={t.pagination.textShow}
          totalCount={data?.getUsers.pagination.totalCount ?? DEFAULT_TOTAL_COUNT}
        />
      </div>
    </Page>
  )
}

UsersPage.getLayout = getNavigationLayout
export default UsersPage
