// @flow
import * as React from 'react'

import { GetAllPostsQuery } from '@/services/posts'
import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'

import s from './PostCarousel.module.scss'

type Props = {
  expand: boolean
  post: NonNullable<GetAllPostsQuery['getPosts']['items'][number]>
}

export const PostCarousel = ({ expand, post }: Props) => {
  return (
    <Carousel>
      <CarouselContent>
        {post.images?.map(image => {
          return (
            <CarouselItem key={image.id}>
              <div className={clsx(s.imageContainer, expand ? s.expanded : s.collapsed)}>
                <Image
                  alt={'post image'}
                  fill
                  sizes={'300px'}
                  src={post.images?.[0]?.url ?? '/apple-touch-icon-dark.png'}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDotButtons />
    </Carousel>
  )
}
