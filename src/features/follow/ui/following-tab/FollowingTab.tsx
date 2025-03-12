import { ComponentPropsWithoutRef } from 'react'

import { FollowTable } from '@/features/follow/ui/follow-table'
import { paginationSelectOptions } from '@/features/payments/config'
import { useTranslation } from '@/shared/hooks'
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
  //TODO: PAGINATION переиспользовать хук для пагинации

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Following Data
      </Typography>
      <FollowTable dateLocale={dateLocale} paginatedData={[]} />
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
    </TabsContent>
  )
}
