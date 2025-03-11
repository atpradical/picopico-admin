import { ComponentPropsWithoutRef } from 'react'

import { ResponseGetUserProfile } from '@/services/profile'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import link from 'next/link'

import s from './ActionButtons.module.scss'

type Props = {
  profileData?: ResponseGetUserProfile
} & ComponentPropsWithoutRef<'div'>

export const ActionButtons = ({ className, profileData, ...props }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(s.actionButtonsContainer, className)} {...props}>
      <Button as={link} className={s.button} href={Paths.Settings} variant={'secondary'}>
        {t.profilePage.profileSettingsButton}
      </Button>
    </div>
  )
}
