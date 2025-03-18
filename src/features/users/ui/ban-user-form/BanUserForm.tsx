import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks'
import { ControlledSelect, ControlledTextArea } from '@/shared/ui/form-components'

import s from './BanUserForm.module.scss'

type Props = {}
export const BanUserForm = (props: Props) => {
  const { t } = useTranslation()
  const [isCustomReason, setIsCustomReasonSelected] = useState(false)
  const { control } = useFormContext()

  const handleReasonChange = (value: string) => {
    if (value === t.usersPage.blockReasons.other) {
      setIsCustomReasonSelected(true)

      return
    }
    setIsCustomReasonSelected(false)
  }

  const blockReasonOptions = useMemo(
    () => [
      {
        label: t.usersPage.blockReasonLabels.advertising,
        value: t.usersPage.blockReasons.advertising,
      },
      { label: t.usersPage.blockReasonLabels.behavior, value: t.usersPage.blockReasons.behavior },
      { label: t.usersPage.blockReasonLabels.other, value: t.usersPage.blockReasons.other },
    ],
    [t]
  )

  return (
    <form className={s.blockReasonContent}>
      <ControlledSelect
        control={control}
        label={t.usersPage.userBanForm.labels.selectReason}
        name={'reason'}
        onValueChange={handleReasonChange}
        options={blockReasonOptions}
      />
      {isCustomReason && (
        <ControlledTextArea
          className={s.reasonTextArea}
          cols={10}
          control={control}
          label={t.usersPage.userBanForm.labels.customReason}
          name={'customReason'}
          placeholder={'why block user?'}
          rows={5}
        />
      )}
    </form>
  )
}
