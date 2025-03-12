import { ComponentPropsWithoutRef } from 'react'

import { DisplayPostContent } from '@/features/posts/ui'
import { DialogRoot } from '@atpradical/picopico-ui-kit'

type PostsDialogProps = {
  //TODO: POST fix any
  postData: any
} & ComponentPropsWithoutRef<typeof DialogRoot>

export const PostDialog = ({ postData, ...props }: PostsDialogProps) => {
  if (!postData) {
    return null
  }

  return (
    <DialogRoot {...props}>
      <DisplayPostContent postData={postData} />
    </DialogRoot>
  )
}
