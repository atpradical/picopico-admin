import { POSTS_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { MAX_BAN_REASON_LENGTH } from '@/features/users/config'
import { LocaleValidationBanReason } from '@/locales/en'
import { z } from 'zod'

export const emailScheme = (message: string) => z.string().email({ message }).toLowerCase()

export const postDescriptionScheme = (message: string) =>
  z.string().max(POSTS_DESCRIPTION_MAX_LENGTH, message).or(z.literal('')) // Допускаем пустую строку

export const banReasonScheme = () => {
  return z.string().trim()
}

export const customBanReasonScheme = (args: LocaleValidationBanReason) => {
  return z.string().trim().max(MAX_BAN_REASON_LENGTH, { message: args.maxLength }).optional()
}
