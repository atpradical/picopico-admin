import { useTranslation } from '@/shared/hooks'
import { DocsContent } from '@/shared/ui/components'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'

function TermsOfServicePage() {
  const { t } = useTranslation()

  return (
    <Page>
      <DocsContent
        docsContent={t.termsOfServicePage.content}
        title={t.termsOfServicePage.pageTitle}
      />
    </Page>
  )
}

TermsOfServicePage.getLayout = getLayout
export default TermsOfServicePage
