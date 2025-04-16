import * as Types from '../../schema.types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

const defaultOptions = {} as const
export type OnPostAddedSubscriptionVariables = Types.Exact<{ [key: string]: never }>

export type OnPostAddedSubscription = {
  __typename?: 'Subscription'
  postAdded: {
    __typename?: 'Post'
    createdAt: any
    description: string
    id: number
    postOwner: {
      __typename?: 'PostOwnerModel'
      id: number
      userName: string
      firstName?: string | null
      lastName?: string | null
      avatars?: Array<{
        __typename?: 'Avatar'
        url?: string | null
        width?: number | null
      }> | null
    }
    userBan?: {
      __typename?: 'UserBan'
      createdAt: any
    } | null
    images?: Array<{
      __typename?: 'ImagePost'
      id?: number | null
      fileSize?: number | null
      createdAt?: any | null
      height?: number | null
      url?: string | null
      width?: number | null
    }> | null
  }
}

export const OnPostAddedDocument = gql`
  subscription OnPostAdded {
    postAdded {
      createdAt
      description
      postOwner {
        id
        userName
        firstName
        lastName
        avatars {
          url
          width
        }
      }
      id
      userBan {
        createdAt
      }
      images {
        id
        fileSize
        createdAt
        height
        url
        width
      }
    }
  }
`

/**
 * __useOnPostAddedSubscription__
 *
 * To run a query within a React component, call `useOnPostAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnPostAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnPostAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnPostAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    OnPostAddedSubscription,
    OnPostAddedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<OnPostAddedSubscription, OnPostAddedSubscriptionVariables>(
    OnPostAddedDocument,
    options
  )
}

export type OnPostAddedSubscriptionHookResult = ReturnType<typeof useOnPostAddedSubscription>
export type OnPostAddedSubscriptionResult = Apollo.SubscriptionResult<OnPostAddedSubscription>
