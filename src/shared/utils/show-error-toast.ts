import { Message } from '@/shared/utils/extract-error-messages'
import { toaster } from '@atpradical/picopico-ui-kit'

export const showErrorToast = (error: unknown) => {
  if (error instanceof Array) {
    const errorData = error as Message[]

    errorData.forEach(el => {
      toaster({ text: el.message, variant: 'error' })
    })
  } else if (typeof error === 'string') {
    toaster({ text: error, variant: 'error' })
  }
}
