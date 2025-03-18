import { ReactNode } from 'react'

import { LocaleBlockUserDialog, LocaleDeleteUserDialog } from '@/locales/en'

export const TAB_PHOTOS = 'photos'
export const TAB_PAYMENTS = 'payments'
export const TAB_FOLLOWERS = 'followers'
export const TAB_FOLLOWING = 'following'

export const INITIAL_CURSOR = 0

export const MAX_BAN_REASON_LENGTH = 200

export type AlertConfig = {
  bodyElement?: ReactNode
  isOpen: boolean
  onConfirm: () => void
  translations: LocaleBlockUserDialog | LocaleDeleteUserDialog
}

export const initialAlertConfig: AlertConfig = {
  bodyElement: null,
  isOpen: false,
  onConfirm: () => {},
  translations: {
    accessibilityDescription: '',
    accessibilityTitle: '',
    closeButton: '',
    confirmButton: '',
    rejectButton: '',
    visibleBody: '',
    visibleTitle: '',
  },
}
