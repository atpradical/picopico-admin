import { HiddenDialogComponents } from '@/shared/ui/components'
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './ConfirmDialog.module.scss'

type ConfirmDialogTranslations = {
  accessibilityDescription: string
  accessibilityTitle: string
  closeButton: string
  confirmButton: string
  rejectButton: string
  visibleBody: string
  visibleTitle: string
}

type ConfirmDialogProps = {
  isLoading?: boolean
  isOpen: boolean
  onConfirm: () => void
  onOpenChange: (isOpen: boolean) => void
  onReject?: () => void
  t: ConfirmDialogTranslations
}

// todo: вынести в ui-kit
export function ConfirmDialog({
  isLoading = false,
  isOpen,
  onConfirm,
  onOpenChange,
  onReject,
  t,
}: ConfirmDialogProps) {
  const closeDialogHandler = () => {
    onOpenChange(false)

    if (onReject) {
      onReject()
    }
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content}>
        <HiddenDialogComponents
          description={t.accessibilityDescription}
          title={t.accessibilityTitle}
        />
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {t.visibleTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={t.closeButton} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Typography variant={'regular_14'}>{t.visibleBody}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button
            className={s.button}
            isLoading={isLoading}
            onClick={onConfirm}
            variant={'outlined'}
          >
            {t.confirmButton}
          </Button>
          <Button className={s.button} onClick={closeDialogHandler}>
            {t.rejectButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
