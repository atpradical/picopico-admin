import { ComponentPropsWithoutRef } from 'react'

import { FollowTable } from '@/features/follow/ui/follow-table'
import { paginationSelectOptions } from '@/features/payments/config'
import { usePagination, useTranslation } from '@/shared/hooks'
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
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Following Data
      </Typography>
      <FollowTable dateLocale={dateLocale} paginatedData={paginatedData} />
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
    </TabsContent>
  )
}
