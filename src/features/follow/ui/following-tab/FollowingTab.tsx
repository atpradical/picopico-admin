import { ComponentPropsWithoutRef } from 'react'

import { FollowTable } from '@/features/follow/ui/follow-table'
import { paginationSelectOptions } from '@/features/payments/config'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_COUNT,
  usePagination,
  useTranslation,
} from '@/shared/hooks'
import { Pagination, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './FollowingTab.module.scss'

type FollowingTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const FollowingTab = ({ className, ...rest }: FollowingTabProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dateLocale = locale === 'ru' ? ru : enUS

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
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Following Data
      </Typography>
      <FollowTable dateLocale={dateLocale} paginatedData={[]} />
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
    </TabsContent>
  )
}
