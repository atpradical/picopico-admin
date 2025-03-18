import { ComponentPropsWithoutRef } from 'react'

import { UserActionsDropdown } from '@/features/users/ui'
import { SortDirection } from '@/services/schema.types'
import { useDeleteUserMutation } from '@/services/users'
import { GetUsersQuery } from '@/services/users/query'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import {
  BlockIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
  clsx,
} from '@atpradical/picopico-ui-kit'
import { Locale } from 'date-fns'
import Link from 'next/link'

import s from './UsersTable.module.scss'

type Props = {
  dateLocale: Locale
  items: GetUsersQuery['getUsers']['users'][number][] | undefined
  onTableSort?: (sortBy: string, sortDirection: string) => void
  sortBy?: string
  sortDirection?: '' | SortDirection
} & ComponentPropsWithoutRef<typeof Table>

export const UsersTable = ({
  dateLocale,
  items,
  onTableSort,
  sortBy,
  sortDirection,
  ...props
}: Props) => {
  const { t } = useTranslation()

  const [deleteUserMutation, { loading }] = useDeleteUserMutation({
    onError: error => {
      // TODO: обработка ошибок
      console.log(error)
    },
  })

  const changeSortHandler = (sortByValue: string) => {
    onTableSort?.(sortByValue, sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <Table className={s.tableRoot} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead
            onSort={() => changeSortHandler('id')}
            sortOrder={sortDirection}
            sortable={sortBy === 'id'}
            textAlign={'left'}
          >
            {t.usersPage.usersTable.headers.userId}
          </TableHead>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.userName}</TableHead>
          <TableHead
            onSort={() => changeSortHandler('userName')}
            sortOrder={sortDirection}
            sortable={sortBy === 'userName'}
            textAlign={'left'}
          >
            {t.usersPage.usersTable.headers.profileLInk}
          </TableHead>
          <TableHead
            onSort={() => changeSortHandler('createdAt')}
            sortOrder={sortDirection}
            sortable={sortBy === 'createdAt'}
            textAlign={'left'}
          >
            {t.usersPage.usersTable.headers.createdAt}
          </TableHead>
          <TableHead textAlign={'left'}>{''}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map(el => {
          const formattedCreatedAt = longLocalizedDate(new Date(el.createdAt), dateLocale)

          const userFullName = el.profile?.firstName
            ? el.profile?.firstName + ' ' + el.profile?.lastName
            : el.userName

          const isBlock = !!el.userBan?.createdAt

          const handleDeleteUser = async (userId: number) => {
            await deleteUserMutation({
              update: cache => {
                // Обновляем кеш после успешного удаления
                const normalizedId = cache.identify({ __typename: 'User', id: userId })

                cache.evict({ id: normalizedId })
                cache.gc() // Очищаем кеш от "мусора"
              },
              variables: {
                userId,
              },
            })
          }

          return (
            <TableRow key={el.id}>
              <TableCell textAlign={'left'}>
                <div className={clsx(isBlock && s.userIdCell)}>
                  {isBlock ? <BlockIcon /> : null}
                  <Typography as={'span'} className={clsx(!isBlock && s.marginLeft)}>
                    {el.id}
                  </Typography>
                </div>
              </TableCell>
              <TableCell textAlign={'left'}>{userFullName}</TableCell>
              <TableCell textAlign={'left'}>
                <Link href={`/users/${el.id}`}>
                  <Typography variant={'regular_link'}>{el.userName}</Typography>
                </Link>
              </TableCell>
              <TableCell textAlign={'left'}>{formattedCreatedAt}</TableCell>
              <TableCell textAlign={'right'}>
                <UserActionsDropdown
                  isLoading={loading}
                  onBanConfirm={() => {
                    console.log('User banned')
                  }}
                  onDeleteConfirm={() => handleDeleteUser(el.id)}
                  userFullName={userFullName}
                  userId={el.id}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
