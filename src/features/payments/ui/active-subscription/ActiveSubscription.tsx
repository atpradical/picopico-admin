import { useTranslation } from '@/shared/hooks'
import { Card, Typography } from '@atpradical/picopico-ui-kit'

import s from './ActiveSubscription.module.scss'

type Props = {}

export const ActiveSubscription = ({}: Props) => {
  const { t } = useTranslation()

  return (
    <section className={s.section}>
      <Typography as={'h3'} variant={'h3'}>
        {t.profileSettings.accountManagementTab.currentSubscription}
      </Typography>
      <Card className={s.container}>ActiveSubscription</Card>
    </section>
  )
}
