import { PaymentSystemDisplay, SubscriptionShortLabel } from '@/features/payments/config'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import { Card, Typography } from '@atpradical/picopico-ui-kit'
import { Locale } from 'date-fns'
import { useRouter } from 'next/router'

import s from './PaymentsUserTableMobile.module.scss'

type Props = {
  dateLocale: Locale
  //   TODO: PAYMENTS fix any
  paginatedData: any[]
}

export const PaymentsUserTableMobile = ({ dateLocale, paginatedData }: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return paginatedData.map((el, index) => {
    const formattedDateOfPayment = longLocalizedDate(new Date(el.dateOfPayment), dateLocale)
    const formattedEndDateOfSubscription = longLocalizedDate(
      new Date(el.endDateOfSubscription),
      dateLocale
    )

    const subscriptionTextsWithTranslation = SubscriptionShortLabel[locale ?? 'en'].find(
      option => option.period === el.subscriptionType
    )

    return (
      <Card className={s.itemContainer} key={`${el.subscriptionId}_${index}`}>
        <div className={s.itemLine}>
          <Typography grey>{t.paymentsTab.table.header.dateOfPayment}</Typography>
          <Typography variant={'bold_14'}>{formattedDateOfPayment}</Typography>
        </div>
        <div className={s.itemLine}>
          <Typography grey>{t.paymentsTab.table.header.subscriptionEndDate}</Typography>
          <Typography variant={'bold_14'}>{formattedEndDateOfSubscription}</Typography>
        </div>
        <div className={s.itemLine}>
          <Typography grey>{t.paymentsTab.table.header.price}</Typography>
          <Typography variant={'bold_14'}>{`$${el.price}`}</Typography>
        </div>
        <div className={s.itemLine}>
          <Typography grey>{t.paymentsTab.table.header.subscriptionDescription}</Typography>
          <Typography variant={'bold_14'}>{subscriptionTextsWithTranslation?.label}</Typography>
        </div>
        <div className={s.itemLine}>
          <Typography grey>{t.paymentsTab.table.header.paymentSystem}</Typography>
          <Typography variant={'bold_14'}>{PaymentSystemDisplay[el.paymentType]}</Typography>
        </div>
      </Card>
    )
  })
}
