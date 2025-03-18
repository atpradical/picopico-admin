import * as Types from '../../schema.types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetFollowersQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
}>

export type GetFollowersQuery = {
  __typename?: 'Query'
  getFollowers: {
    __typename?: 'FollowPaginationModel'
    totalCount: number
    pageSize: number
    page: number
    pagesCount: number
    items: Array<{
      __typename?: 'Follow'
      userId: number
      id: number
      userName?: string | null
      createdAt: any
    }>
  }
}

export const GetFollowersDocument = gql`
  query getFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int) {
    getFollowers(pageSize: $pageSize, pageNumber: $pageNumber, userId: $userId) {
      items {
        userId
        id
        userName
        createdAt
      }
      totalCount
      pageSize
      page
      pagesCount
    }
  }
`

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *   },
 * });
 */
export function useGetFollowersQuery(
  baseOptions: Apollo.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables> &
    ({ variables: GetFollowersQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
    options
  )
}
export function useGetFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
    options
  )
}
export function useGetFollowersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
    options
  )
}
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>
export type GetFollowersSuspenseQueryHookResult = ReturnType<typeof useGetFollowersSuspenseQuery>
export type GetFollowersQueryResult = Apollo.QueryResult<
  GetFollowersQuery,
  GetFollowersQueryVariables
>
