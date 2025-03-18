import { banUserSchemeCreator } from '@/features/users/model'
import { z } from 'zod'

export type BanUserFormFields = z.infer<ReturnType<typeof banUserSchemeCreator>>
