import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { MAX_ABOUT_ME_LENGTH } from '@/features/profile/config'
import { profileDataSchemeCreator } from '@/features/profile/model'
import { ProfileFormFields } from '@/features/profile/model/profile.types'
import { ProfileAvatarManager } from '@/features/profile/ui'
import { ResponseGetMyProfile, useUpdateMyProfileMutation } from '@/services/profile'
import { useTranslation } from '@/shared/hooks'
import {
  ControlledDatePicker,
  ControlledTextArea,
  ControlledTextField,
} from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { Button, TabsContent, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'
import clsx from 'clsx'

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = {
  myProfileData: ResponseGetMyProfile
} & ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, myProfileData, ...rest }: ProfileDataTabProps) => {
  const { t } = useTranslation()

  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation()

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    setError,
  } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: myProfileData.aboutMe ?? '',
      city: myProfileData.city ?? '',
      country: myProfileData.country ?? '',
      dateOfBirth: myProfileData?.dateOfBirth ? new Date(myProfileData.dateOfBirth) : undefined,
      firstName: myProfileData.firstName ?? '',
      lastName: myProfileData.lastName ?? '',
      userName: myProfileData.userName ?? '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileDataSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async data => {
    try {
      await updateProfile({
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toString() : undefined,
      }).unwrap()
      toaster({ text: t.profileSettings.profileDataTab.successSettingsChangeMessage })
    } catch (e) {
      const errors = getErrorMessageData(e)

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof ProfileFormFields)[])],
        setError,
      })
    }
  })

  const datePickerDefault = myProfileData.dateOfBirth
    ? new Date(myProfileData.dateOfBirth)
    : undefined

  const isDisabledConfirmButton = !isValid || !isDirty

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <div className={s.formWrapper}>
        <ProfileAvatarManager />
        <form className={s.form} id={'profile-form'} onSubmit={formHandler}>
          <ControlledTextField
            control={control}
            isRequired
            label={t.profileSettings.profileDataTab.labels.userName}
            name={'userName'}
          />
          <ControlledTextField
            control={control}
            isRequired
            label={t.profileSettings.profileDataTab.labels.firstName}
            name={'firstName'}
            placeholder={t.profileSettings.profileDataTab.placeholders.firstName}
          />
          <ControlledTextField
            control={control}
            isRequired
            label={t.profileSettings.profileDataTab.labels.lastName}
            name={'lastName'}
            placeholder={t.profileSettings.profileDataTab.placeholders.lastName}
          />
          {
            <ControlledDatePicker
              control={control}
              defaultValue={datePickerDefault}
              isRequired
              label={t.profileSettings.profileDataTab.labels.dateOfBirth}
              name={'dateOfBirth'}
            />
          }
          <ControlledTextArea
            className={s.textArea}
            control={control}
            counterLimit={MAX_ABOUT_ME_LENGTH}
            label={t.profileSettings.profileDataTab.labels.aboutMe}
            name={'aboutMe'}
            placeholder={t.profileSettings.profileDataTab.placeholders.aboutMe}
          />
        </form>
      </div>
      <Separator.Root className={s.separator} />
      <Button
        className={s.submitButton}
        disabled={isDisabledConfirmButton}
        form={'profile-form'}
        isLoading={isLoading}
        type={'submit'}
      >
        {t.profileSettings.profileDataTab.formSubmitButton}
      </Button>
    </TabsContent>
  )
}
