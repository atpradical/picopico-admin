import { ApolloError } from '@apollo/client'

export type Message = {
  field: string
  message: string
}

export type OriginalError = {
  error: string
  message: Message[]
  statusCode: number
}

export type ServerErrorResponse = {
  code: string
  originalError: OriginalError
  stacktrace: string[]
}

const FALLBACK_ERROR = 'Unknown error occurred'

export function extractErrorMessages(error: ApolloError): Message[] | string {
  if (error.graphQLErrors.length) {
    if (error.graphQLErrors[0].extensions) {
      const serverErrorResponse = error.graphQLErrors[0].extensions as ServerErrorResponse

      if (serverErrorResponse.originalError) {
        const originalError = serverErrorResponse.originalError as OriginalError

        if (originalError.message.length) {
          return originalError.message
        }
      }
    }
  }

  if (error.networkError) {
    return error.networkError.message
  }

  return JSON.stringify(error) || FALLBACK_ERROR
}
