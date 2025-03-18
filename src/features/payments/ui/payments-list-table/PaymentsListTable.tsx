import { ComponentPropsWithoutRef } from 'react'

import { PaymentSystemDisplay, SubscriptionShortLabel } from '@/features/payments/config'
import { GetPaymentsQuery } from '@/services/payments'
import { SortDirection } from '@/services/schema.types'
import { BillingPeriod } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@atpradical/picopico-ui-kit'
import { Locale } from 'date-fns'
import { useRouter } from 'next/router'

import s from './PaymentsListTable.module.scss'

type Props = {
  dateLocale: Locale
  items: GetPaymentsQuery['getPayments']['items'][number][] | undefined
  onTableSort?: (sortBy: string, sortDirection: string) => void
  sortBy?: string
  sortDirection?: '' | SortDirection
} & ComponentPropsWithoutRef<typeof Table>

export const PaymentsListTable = ({
  dateLocale,
  items,
  onTableSort,
  sortBy,
  sortDirection,
  ...props
}: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const changeSortHandler = (sortByValue: string) => {
    onTableSort?.(sortByValue, sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <Table className={s.tableRoot} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead
            onSort={() => changeSortHandler('userName')}
            sortOrder={sortDirection}
            sortable={sortBy === 'userName'}
            textAlign={'left'}
          >
            {t.paymentsPage.table.header.username}
          </TableHead>
          <TableHead
            onSort={() => changeSortHandler('createdAt')}
            sortOrder={sortDirection}
            sortable={sortBy === 'createdAt'}
            textAlign={'left'}
          >
            {t.paymentsPage.table.header.dateOfPayment}
          </TableHead>
          <TableHead
            onSort={() => changeSortHandler('amount')}
            sortOrder={sortDirection}
            sortable={sortBy === 'amount'}
            textAlign={'left'}
          >
            {t.paymentsPage.table.header.price}
          </TableHead>
          <TableHead
            onSort={() => changeSortHandler('type')}
            sortOrder={sortDirection}
            sortable={sortBy === 'type'}
            textAlign={'left'}
          >
            {t.paymentsPage.table.header.subscriptionDescription}
          </TableHead>
          <TableHead
            onSort={() => changeSortHandler('paymentMethod')}
            sortOrder={sortDirection}
            sortable={sortBy === 'paymentMethod'}
            textAlign={'left'}
          >
            {t.paymentsPage.table.header.paymentSystem}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map(el => {
          const formattedDateOfPayment = longLocalizedDate(new Date(el.createdAt), dateLocale)

          const subscriptionTextsWithTranslation = SubscriptionShortLabel[locale ?? 'en'].find(
            option => option.period === (el.type as unknown as BillingPeriod)
          )

          return (
            <TableRow key={el.id}>
              <TableCell textAlign={'left'}>
                <div className={s.userNameCell}>
                  <Avatar
                    showFallback
                    size={'xs'}
                    src={el.avatars?.[1]?.url ?? ''}
                    userName={el.userName}
                  />
                  {el.userName}
                </div>
              </TableCell>
              <TableCell textAlign={'left'}>{formattedDateOfPayment}</TableCell>
              <TableCell textAlign={'left'}>{el.amount}</TableCell>
              <TableCell textAlign={'left'}>{subscriptionTextsWithTranslation?.label}</TableCell>
              <TableCell textAlign={'left'}>{PaymentSystemDisplay[el.paymentMethod]}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
