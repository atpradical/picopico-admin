import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { AlertConfig, initialAlertConfig } from '@/features/users/config'
import { BanUserForm } from '@/features/users/ui'
import { Paths } from '@/shared/enums'
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
  RadioButtonUncheckedIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './UserActionsDropdown.module.scss'

type Props = {
  isBlock: boolean
  isLoading?: boolean
  onBanConfirm: () => void
  onDeleteConfirm: () => void
  onUnblockConfirm: () => void
  userFullName: string
  userId: number
}

export const UserActionsDropdown = ({
  isBlock,
  isLoading,
  onBanConfirm,
  onDeleteConfirm,
  onUnblockConfirm,
  userFullName,
  userId,
}: Props) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { reset } = useFormContext()

  const [alert, setAlert] = useState<AlertConfig>(initialAlertConfig)

  const closeDialog = useCallback(() => {
    setAlert(initialAlertConfig)
    reset()
  }, [reset])

  const onUserDeleteHandler = useCallback(() => {
    setAlert({
      bodyElement: null,
      isOpen: true,
      onConfirm: () => {
        onDeleteConfirm()
        closeDialog()
      },
      translations: {
        ...t.usersPage.deleteUserDialog,
        visibleBody: t.usersPage.deleteUserDialog.visibleBody + ' ' + userFullName + '?',
      },
    })
  }, [t, onDeleteConfirm, userFullName, closeDialog])

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

  const moreUserInformationHandler = () => {
    void push(`${Paths.Users}/${userId}`)
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

              {isBlock ? (
                <DropdownMenuItem onClick={onUserUnblockHandler}>
                  <RadioButtonUncheckedIcon className={s.icon} />
                  <Typography>{t.usersPage.userActionsDropdown.unblockUser}</Typography>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={onUserBlockHandler}>
                  <BlockIcon className={s.icon} />
                  <Typography>{t.usersPage.userActionsDropdown.blockUser}</Typography>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={moreUserInformationHandler}>
                <MoreHorizontalIcon className={s.icon} />
                <Typography>{t.usersPage.userActionsDropdown.more}</Typography>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>

      <ConfirmDialog
        bodyElement={alert.bodyElement}
        isLoading={isLoading}
        isOpen={alert.isOpen}
        onConfirm={alert.onConfirm}
        onOpenChange={closeDialog}
        t={alert.translations}
      />
    </>
  )
}
