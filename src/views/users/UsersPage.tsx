import { paginationSelectOptions } from '@/features/payments/config'
import { UsersTable } from '@/features/users/ui'
import { useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Pagination, Select, TextField, Typography } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './UsersPage.module.scss'

function UsersPage() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dateLocale = locale === 'ru' ? ru : enUS
  //TODO: PAGINATION переиспользовать хук для пагинации

  return (
    <Page pt={'60px'}>
      <div className={s.container}>
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
        <UsersTable dateLocale={dateLocale} paginatedData={[]} />
        <Pagination
          currentPage={1}
          onNextPage={() => {}}
          onPageChange={() => {}}
          onPrevPage={() => {}}
          onSelectValueChange={() => {}}
          pageSize={100}
          selectOptions={paginationSelectOptions}
          textPerPage={t.pagination.textPerPage}
          textShow={t.pagination.textShow}
          totalCount={10000}
        />
        <Typography variant={'error'}>Page in development....</Typography>
      </div>
    </Page>
  )
}

UsersPage.getLayout = getNavigationLayout
export default UsersPage
