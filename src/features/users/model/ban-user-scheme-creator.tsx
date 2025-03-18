import { LocaleValidation } from '@/locales/en'
import { createCustomErrorMap } from '@/shared/lib/custom-error-map'
import { banReasonScheme, customBanReasonScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const banUserSchemeCreator = (t: LocaleValidation) => {
  const banUserErrorMap = createCustomErrorMap(t)

  z.setErrorMap(banUserErrorMap)

  return z.object({
    customReason: customBanReasonScheme(t.banReason),
    reason: banReasonScheme(),
  })
}
