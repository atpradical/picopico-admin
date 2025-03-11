import { useTranslation } from '@/shared/hooks'
import { Card, Typography } from '@atpradical/picopico-ui-kit'

import s from './AccountTypeRadioGroup.module.scss'

type AccountTypeProps = {
  onChange?: () => void
}
export const AccountTypeRadioGroup = ({ onChange }: AccountTypeProps) => {
  const { t } = useTranslation()

  return (
    <section className={s.section}>
      <Typography as={'h3'} variant={'h3'}>
        {t.profileSettings.accountManagementTab.accountTypes}
      </Typography>
      <Card className={s.container}>AccountTypeRadioGroup</Card>
    </section>
  )
}
