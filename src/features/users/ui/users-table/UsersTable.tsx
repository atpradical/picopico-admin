import { ComponentPropsWithoutRef } from 'react'

import { UserActionsDropdown } from '@/features/users/ui'
import { GetUsersQuery } from '@/services/users/query'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import {
  BlockIcon,
  Spinner,
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
  loading: boolean
} & ComponentPropsWithoutRef<typeof Table>

export const UsersTable = ({ dateLocale, items, loading, ...props }: Props) => {
  const { t } = useTranslation()

  return (
    <Table className={s.tableRoot} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.userId}</TableHead>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.userName}</TableHead>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.profileLInk}</TableHead>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.createdAt}</TableHead>
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
                  onBanConfirm={() => {
                    console.log('User banned')
                  }}
                  onDeleteConfirm={() => {
                    console.log('User deleted')
                  }}
                  userId={'user-id-1'}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      {/*TODO: UI-KIT добавить пропс на стили спиннер контейнера*/}
      {loading && <Spinner label={t.loading} />}
    </Table>
  )
}
