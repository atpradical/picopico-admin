import { ComponentPropsWithoutRef, ElementRef, forwardRef, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { MockPostImage, PostCarousel, PostDescription } from '@/features/posts/ui'
import { AlertConfig, initialAlertConfig } from '@/features/users/config'
import { BanUserForm } from '@/features/users/ui'
import { GetAllPostsQuery } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { getDateDistanceToNow } from '@/shared/utils'
import {
  Avatar,
  BlockIcon,
  Button,
  RadioButtonUncheckedIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './Post.module.scss'

type PostProps = {
  isLoading: boolean
  onBanConfirm: () => void
  onUnblockConfirm: () => void
  post: NonNullable<GetAllPostsQuery['getPosts']['items'][number]>
  userFullName: string
} & ComponentPropsWithoutRef<'div'>

type PostPropsRef = ElementRef<'div'>

export const Post = forwardRef<PostPropsRef, PostProps>(
  ({ isLoading, onBanConfirm, onUnblockConfirm, post, userFullName, ...rest }, ref) => {
    const { t } = useTranslation()
    const { locale } = useRouter()
    const { reset } = useFormContext()
    const [alert, setAlert] = useState<AlertConfig>(initialAlertConfig)
    const formattedCreatedAt = getDateDistanceToNow(new Date(post.createdAt), locale ?? 'en')

    const [expand, setExpand] = useState(false)
    const toggleDescription = () => {
      setExpand(!expand)
    }

    const closeDialog = useCallback(() => {
      setAlert(initialAlertConfig)
      reset()
    }, [reset])

    const onUserBlockHandler = () => {
      setAlert({
        bodyElement: <BanUserForm />,
        isOpen: true,
        onConfirm: () => {
          onBanConfirm()
          reset()
          closeDialog()
        },
        translations: {
          ...t.usersPage.blockUserDialog,
          visibleBody: t.usersPage.blockUserDialog.visibleBody + ' ' + userFullName + '?',
        },
      })
    }

    const onUserUnblockHandler = () => {
      setAlert({
        bodyElement: null,
        isOpen: true,
        onConfirm: () => {
          onUnblockConfirm()
          closeDialog()
        },
        translations: {
          ...t.usersPage.unblockUserDialog,
          visibleBody: t.usersPage.unblockUserDialog.visibleBody + ' ' + userFullName + '?',
        },
      })
    }

    const isBlock = !!post.userBan?.createdAt

    return (
      <div className={s.publicationContainer} {...rest} ref={ref}>
        {post.images?.[0]?.url ? <PostCarousel expand={expand} post={post} /> : <MockPostImage />}
        <div className={s.avatarContainer}>
          <Avatar
            showFallback
            showUserName
            size={'xs'}
            src={post.postOwner.avatars?.[0]?.url ?? ''}
            userName={post.postOwner.userName}
          />
          {isBlock ? (
            <>
              <Button onClick={onUserUnblockHandler} title={'unban user'} variant={'icon'}>
                <BlockIcon />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onUserBlockHandler} title={'ban user'} variant={'icon'}>
                <RadioButtonUncheckedIcon />
              </Button>
            </>
          )}
        </div>
        <div>
          <Typography grey variant={'small'}>
            {formattedCreatedAt}
          </Typography>
          <PostDescription expand={expand} onToggle={toggleDescription} post={post} />
        </div>
        <ConfirmDialog
          bodyElement={alert.bodyElement}
          isLoading={isLoading}
          isOpen={alert.isOpen}
          onConfirm={alert.onConfirm}
          onOpenChange={closeDialog}
          t={alert.translations}
        />
      </div>
    )
  }
)
