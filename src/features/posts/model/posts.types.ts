import { postsDescriptionSchemeCreator } from '@/features/posts/model/posts-descriptioin-scheme-creator'
import { z } from 'zod'

export type PostsDescriptionField = z.infer<ReturnType<typeof postsDescriptionSchemeCreator>>
