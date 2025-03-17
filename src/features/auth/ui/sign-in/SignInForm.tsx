import { useForm } from 'react-hook-form'

import { LOGIN_ADMIN, PASSWORD_ADMIN } from '@/features/auth/config'
import { signInSchemeCreator } from '@/features/auth/model'
import { SignInFields } from '@/features/auth/model/sign-in/types'
import { useLoginMutation } from '@/services/auth'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ControlledTextField } from '@/shared/ui/form-components'
import { extractErrorMessages, setFormErrors } from '@/shared/utils'
import { Button, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import s from './SignInForm.module.scss'

export const SignInForm = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [login, { loading }] = useLoginMutation({
    onError: error => {
      const messages = extractErrorMessages(error)

      // Если login и пароль прошли валидацию, но при этом они не правильные, тогда в ответе просто вернется false.
      // В остальных случаях подсветим поля которые не прошли валидацию
      setFormErrors({
        errors: messages,
        fields: [
          ...(Object.keys(
            Array.isArray(messages) ? messages.map(item => item.field) : []
          ) as (keyof SignInFields)[]),
        ],
        setError,
      })
    },
  })

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<SignInFields>({
    defaultValues: {
      email: LOGIN_ADMIN,
      password: PASSWORD_ADMIN,
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async data => {
    const result = await login({ variables: data })

    if (!result.data) {
      return
    }

    if (result.data?.loginAdmin.logged) {
      localStorage.setItem('token', btoa(`${data.email}:${data.password}`))
      void push(Paths.Users)

      return
    }
    if (result.data?.loginAdmin.logged === false) {
      setFormErrors({
        errors: t.validation.loginFailed,
        fields: [...(Object.keys(data) as (keyof SignInFields)[])],
        setError,
      })
      toaster({ text: t.validation.loginFailed, variant: 'error' })
    }
  })

  return (
    <form className={s.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={t.signInPage.signInForm.labels.email}
        name={'email'}
        placeholder={t.signInPage.signInForm.placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
        label={t.signInPage.signInForm.labels.password}
        name={'password'}
        placeholder={t.signInPage.signInForm.placeholders.addPassword}
        variant={'password'}
      />
      <Button className={s.submitButton} disabled={!isValid} isLoading={loading} type={'submit'}>
        {t.signInPage.signInForm.submitButton}
      </Button>
    </form>
  )
}
