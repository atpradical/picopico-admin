import { POSTS_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { z } from 'zod'

export const emailScheme = (message: string) => z.string().email({ message }).toLowerCase()

export const postDescriptionScheme = (message: string) =>
  z.string().max(POSTS_DESCRIPTION_MAX_LENGTH, message).or(z.literal('')) // Допускаем пустую строку
