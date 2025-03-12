import { paginationSelectOptions } from '@/features/payments/config'
import { UsersTable } from '@/features/users/ui'
import { usePagination, useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Pagination, Select, TextField, Typography } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './UsersPage.module.scss'

function UsersPage() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dateLocale = locale === 'ru' ? ru : enUS

  const {
    changePage,
    changePageSize,
    currentPage,
    nextPage,
    pageSize,
    paginatedData,
    prevPage,
    totalCount,
  } = usePagination({ data: [{}, {}, {}] })

  return (
    <Page pt={'60px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          Users List
        </Typography>
        <div className={s.searchContainer}>
          <TextField label={'Search'} variant={'search'} />
          <Select
            className={s.filterSelect}
            defaultValue={'active'}
            label={'Filters'}
            options={[
              { label: 'Blocked', value: 'blocked' },
              { label: 'Not Blocked', value: 'active' },
            ]}
          />
        </div>
        <UsersTable dateLocale={dateLocale} paginatedData={paginatedData} />
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
        <Typography variant={'error'}>Page in development....</Typography>
      </div>
    </Page>
  )
}

UsersPage.getLayout = getNavigationLayout
export default UsersPage
