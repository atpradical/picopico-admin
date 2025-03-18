import { ComponentPropsWithoutRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { BanUserFormFields, banUserSchemeCreator } from '@/features/users/model'
import { UserActionsDropdown } from '@/features/users/ui'
import { SortDirection } from '@/services/schema.types'
import { useBanUserMutation, useDeleteUserMutation, useUnbanUserMutation } from '@/services/users'
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
import { zodResolver } from '@hookform/resolvers/zod'
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

  const methods = useForm<BanUserFormFields>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(banUserSchemeCreator(t.validation)),
  })

  const { handleSubmit } = methods

  const [deleteUserMutation, { loading }] = useDeleteUserMutation({
    onError: error => {
      // TODO: обработка ошибок
      console.log(error)
    },
  })

  const [banUserMutation, { loading: LoadingBan }] = useBanUserMutation({
    onError: error => {
      // TODO: обработка ошибок
      console.log(error)
    },
  })

  const [unbanUserMutation, { loading: loadingUnBan }] = useUnbanUserMutation({
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

          const handleBanUser = handleSubmit(async data => {
            const finalBanReason = data.customReason ? data.customReason : data.reason

            await banUserMutation({
              update: cache => {
                // Обновляем кеш после успешной блокировки
                cache.modify({
                  fields: {
                    userBan(existingUserBan = {}) {
                      // Возвращаем обновленный объект userBan
                      return {
                        ...existingUserBan,
                        createdAt: new Date().toISOString(), // Указываем текущее время
                        reason: finalBanReason,
                      }
                    },
                  },
                  id: cache.identify({ __typename: 'User', id: el.id }),
                })
              },
              variables: { banReason: finalBanReason, userId: el.id },
            })
          })

          const handleUnbanUser = async () => {
            await unbanUserMutation({
              update: cache => {
                // Обновляем кеш после успешной блокировки
                cache.modify({
                  fields: {
                    userBan() {
                      // Возвращаем обновленный объект userBan
                      return null
                    },
                  },
                  id: cache.identify({ __typename: 'User', id: el.id }),
                })
              },
              variables: { userId: el.id },
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
                <FormProvider {...methods}>
                  <UserActionsDropdown
                    isBlock={isBlock}
                    isLoading={loading || LoadingBan || loadingUnBan}
                    onBanConfirm={handleBanUser}
                    onDeleteConfirm={() => handleDeleteUser(el.id)}
                    onUnblockConfirm={handleUnbanUser}
                    userFullName={userFullName}
                    userId={el.id}
                  />
                </FormProvider>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
