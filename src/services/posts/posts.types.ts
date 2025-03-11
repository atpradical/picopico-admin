import { SortDirection } from '@/shared/enums/sort.enums'
import { Nullable } from '@/shared/types'

export type CreatePostArgs = {
  childrenMetadata: ChildrenMetaData[]
  description: string
}

export type ChildrenMetaData = {
  uploadId: string
}

export type CreatePostResponse = {
  avatarOwner: string
  // todo: CHECK typeof avatarWhoLikes and location
  avatarWhoLikes: any[]
  createdAt: string
  description: string
  id: number
  images: ResponseImagesData[]
  isLiked: boolean
  likesCount: number
  location: any
  owner: OwnerData
  ownerId: number
  updatedAt: string
  userName: string
}

export type ResponseImagesData = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type OwnerData = {
  firstName: string
  lastName: string
}

export type CreatePostImageArgs = {
  file: Nullable<File[]>
}

export type CreatePostImageResponse = {
  images: ImagesData[]
}
export type ImagesData = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type GetPostsResponse = {
  items: GetPostsItems[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type GetPostsItems = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: ImagesData[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: OwnerData
  ownerId: number
  updatedAt: string
  userName: string
}

export type GetPostsArgs = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
  userName: string
}

export type DeletePostArgs = {
  postId: number
}

export type UpdatePostArgs = {
  description: string
  postId: number
}

export type GetPostsAllPublicArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  userId: number
}

export type GetPostsAllPublicResponse = {
  items: PublicPostsItem[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type PublicPostsItem = {
  avatarOwner: string
  // todo: CHECK type of avatarWhoLikes and location
  avatarWhoLikes: any[]
  createdAt: string
  description: string
  id: number
  images: ImagesData[]
  isLiked: boolean
  likesCount: number
  location: any
  owner: OwnerData
  ownerId: number
  updatedAt: string
  userName: string
}

export type GetPublicPostByIdResponse = PublicPostsItem
export type GetPublicPostByIdArgs = {
  postId: number
}
