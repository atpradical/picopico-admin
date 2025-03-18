import { ComponentPropsWithoutRef } from 'react'

import { GetFollowersQuery } from '@/services/follow'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { Locale } from 'date-fns'
import Link from 'next/link'

import s from './FollowTable.module.scss'

type Props = {
  dateLocale: Locale
  items: GetFollowersQuery['getFollowers']['items'][number][] | undefined
} & ComponentPropsWithoutRef<typeof Table>

export const FollowTable = ({ dateLocale, items, ...props }: Props) => {
  const { t } = useTranslation()

  return (
    <Table className={s.tableRoot} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead textAlign={'left'}>{t.follow.tabNames.userId}</TableHead>
          <TableHead textAlign={'left'}>{t.follow.tabNames.username}</TableHead>
          <TableHead textAlign={'left'}>{t.follow.tabNames.link}</TableHead>
          <TableHead textAlign={'left'}>{t.follow.tabNames.subscribeDate}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map(el => {
          const formattedCreatedAt = longLocalizedDate(new Date(el.createdAt), dateLocale)

          return (
            <TableRow key={el.id}>
              <TableCell textAlign={'left'}>{el.userId}</TableCell>
              <TableCell textAlign={'left'}>{el.userName}</TableCell>
              <TableCell textAlign={'left'}>
                <Link
                  href={process.env.NEXT_PUBLIC_PICOPICO_MAIN_URL + '/profile/' + el.userId}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <Typography variant={'regular_link'}>{el.userName}</Typography>
                </Link>
              </TableCell>
              <TableCell textAlign={'left'}>{formattedCreatedAt}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
