import { Area, Point } from 'react-easy-crop'

import { PostFilter } from '@/features/posts/config'
import { postsDescriptionSchemeCreator } from '@/features/posts/model/posts-descriptioin-scheme-creator'
import { Nullable } from '@/shared/types'
import { z } from 'zod'

export type PostsState = {
  activeSlideIndex: number
  currentStep: PostsStep
  isDialogOpen: boolean
  previewList: PostPreview[]
  previewUrlsList: string[]
}

export type PostPreview = {
  appliedFilter: PostFilter
  appliedZoom: number
  aspectModified: number
  aspectOrig: number
  crop: Point
  croppedAreaPixels: Nullable<Area>
  previewUrlModified: string
  previewUrlOrig: string
}

export type PostsDescriptionField = z.infer<ReturnType<typeof postsDescriptionSchemeCreator>>

export enum PostsStep {
  Crop = 'CROP',
  Filters = 'FILTERS',
  Publish = 'PUBLISH',
  Start = 'START',
}
