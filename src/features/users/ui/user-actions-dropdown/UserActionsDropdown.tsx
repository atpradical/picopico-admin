import { useState } from 'react'

import { useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import {
  BlockIcon,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  MoreHorizontalIcon,
  PersonRemoveOutlineIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './UserActionsDropdown.module.scss'

type EditPostDropdownProps = {
  onBanConfirm: () => void
  onDeleteConfirm: () => void
}

export const UserActionsDropdown = ({ onBanConfirm, onDeleteConfirm }: EditPostDropdownProps) => {
  const { t } = useTranslation()
  const [isDeleteAlert, setDeleteAlert] = useState(false)
  const [isBlockAlert, setBlockAlert] = useState(false)
  // const [deletePost] = useDeletePostMutation()

  const onUserDeleteHandler = () => {
    setDeleteAlert(true)
  }

  const onUserBlockHandler = () => {
    setBlockAlert(true)
  }

  const deleteUserHandler = async () => {
    try {
      // await some deleteUser function
      onDeleteConfirm()
    } finally {
      setDeleteAlert(false)
    }
  }

  const blockUserHandler = async () => {
    try {
      // await some blockUser() function
      onBanConfirm()
    } finally {
      setBlockAlert(false)
    }
  }

  const moreUserInformationHandler = () => {
    //
    console.log('swithc to user page for more information')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'icon'}>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent align={'end'} className={s.dropdownContent}>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onUserDeleteHandler}>
                <PersonRemoveOutlineIcon className={s.icon} />
                <Typography>{t.usersPage.userActionsDropdown.deleteUser}</Typography>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={onUserBlockHandler}>
                <BlockIcon className={s.icon} />
                <Typography>{t.usersPage.userActionsDropdown.blockUser}</Typography>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={moreUserInformationHandler}>
                <MoreHorizontalIcon className={s.icon} />
                <Typography>{t.usersPage.userActionsDropdown.more}</Typography>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <ConfirmDialog
        isOpen={isDeleteAlert}
        onConfirm={deleteUserHandler}
        onOpenChange={setDeleteAlert}
        t={t.usersPage.deleteUserDialog}
      />
      <ConfirmDialog
        isOpen={isBlockAlert}
        onConfirm={blockUserHandler}
        onOpenChange={setBlockAlert}
        t={t.usersPage.blockUserDialog}
      />
    </>
  )
}
