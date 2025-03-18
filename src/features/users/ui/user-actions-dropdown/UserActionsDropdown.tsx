import { useCallback, useState } from 'react'

import { AlertConfig, BlockUserOptions, initialAlertConfig } from '@/features/users/config'
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
  Select,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './UserActionsDropdown.module.scss'

type Props = {
  isLoading?: boolean
  onBanConfirm: () => void
  onDeleteConfirm: () => void
  userFullName: string
  userId: number
}

export const UserActionsDropdown = ({
  isLoading,
  onBanConfirm,
  onDeleteConfirm,
  userFullName,
  userId,
}: Props) => {
  const { t } = useTranslation()
  const { push } = useRouter()

  const [alert, setAlert] = useState<AlertConfig>(initialAlertConfig)

  const closeDialog = () => {
    setAlert(initialAlertConfig)
  }

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
  }, [t, onDeleteConfirm, userFullName])

  const onUserBlockHandler = useCallback(() => {
    setAlert({
      bodyElement: (
        <Select
          defaultValue={'3'}
          label={t.usersPage.blockUserReasonLabel}
          options={BlockUserOptions}
        />
      ),
      isOpen: true,
      onConfirm: () => {
        onBanConfirm()
        closeDialog()
      },
      translations: t.usersPage.blockUserDialog,
    })
  }, [onBanConfirm, t])

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
