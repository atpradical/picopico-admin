import { useContext, useEffect } from 'react'

import { SignInForm } from '@/features/auth/ui'
import { OAuth } from '@/features/oAuth'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { Button, Card, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SignInPage.module.scss'

function SignInPage() {
  const { isAuth, meData } = useContext(AuthContext)
  const router = useRouter()
  const { t } = useTranslation()
  const { isAccount, pageTitle, signUpLink } = t.signInPage

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  useEffect(() => {
    if (isAuth && meData?.userId && !!token) {
      router.push(Paths.profile + '/' + meData.userId)
    }
  }, [isAuth, meData, router, token])

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <OAuth />
          <SignInForm />
          <Typography variant={'regular_16'}>{isAccount}</Typography>
          <Button as={Link} className={s.linkButton} href={Paths.signUp} variant={'nb-outlined'}>
            {signUpLink}
          </Button>
        </Card>
      </div>
    </Page>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
