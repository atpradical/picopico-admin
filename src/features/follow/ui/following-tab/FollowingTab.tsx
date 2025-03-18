import { ComponentPropsWithoutRef, useContext } from 'react'

import { FollowTable } from '@/features/follow/ui'
import { paginationSelectOptions } from '@/features/payments/config'
import { useGetFollowingQuery } from '@/services/follow'
import { InputMaybe, QueryGetFollowingArgs } from '@/services/schema.types'
import { AuthContext } from '@/shared/context'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_COUNT,
  usePagination,
  useTranslation,
} from '@/shared/hooks'
import { Pagination, Spinner, TabsContent } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './FollowingTab.module.scss'

type FollowingTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const FollowingTab = ({ className, ...rest }: FollowingTabProps) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { locale, query } = useRouter()

  const dateLocale = locale === 'ru' ? ru : enUS

  const userId = query.id ? query.id : ''
  const pageSize = query.pageSize ? query.pageSize : DEFAULT_PAGE_SIZE
  const pageNumber = query.pageNumber ? query.pageNumber : DEFAULT_PAGE

  const { data, loading } = useGetFollowingQuery({
    // TODO: GRAPHQL обработка ошибок
    fetchPolicy: 'network-only',
    skip: !isAuth,
    variables: {
      pageNumber: +pageNumber as InputMaybe<QueryGetFollowingArgs['pageNumber']>,
      pageSize: +pageSize as InputMaybe<QueryGetFollowingArgs['pageSize']>,
      userId: +userId as QueryGetFollowingArgs['userId'],
    },
  })

  const { changePage, changePageSize, nextPage, prevPage } = usePagination({
    page: data?.getFollowing.page ?? DEFAULT_PAGE,
  })

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <FollowTable dateLocale={dateLocale} items={data?.getFollowing.items} />
      {loading && <Spinner label={t.loading} />}
      <Pagination
        currentPage={data?.getFollowing.page ?? DEFAULT_PAGE}
        onNextPage={nextPage}
        onPageChange={changePage}
        onPrevPage={prevPage}
        onSelectValueChange={changePageSize}
        pageSize={+pageSize}
        selectOptions={paginationSelectOptions}
        textPerPage={t.pagination.textPerPage}
        textShow={t.pagination.textShow}
        totalCount={data?.getFollowing.totalCount ?? DEFAULT_TOTAL_COUNT}
      />
    </TabsContent>
  )
}
