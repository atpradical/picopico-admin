import { SignInForm } from '@/features/auth/ui'
import { useTranslation } from '@/shared/hooks'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { Card, Typography } from '@atpradical/picopico-ui-kit'

import s from './SignInPage.module.scss'

function SignInPage() {
  const { t } = useTranslation()
  const { pageTitle } = t.signInPage

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <SignInForm />
        </Card>
      </div>
    </Page>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
