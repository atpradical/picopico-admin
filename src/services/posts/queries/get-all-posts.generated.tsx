import * as Types from '../../schema.types';

import { gql } from '@apollo/client';
import { AllPostsPaginationFieldsFragmentFragmentDoc } from '../../fragments.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostsPaginationModel', pagesCount: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Post', createdAt: any, description: string, id: number, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string, firstName?: string | null, lastName?: string | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null }> | null }, userBan?: { __typename?: 'UserBan', createdAt: any } | null, images?: Array<{ __typename?: 'ImagePost', id?: number | null, fileSize?: number | null, createdAt?: any | null, height?: number | null, url?: string | null, width?: number | null }> | null }> } };


export const GetAllPostsDocument = gql`
    query GetAllPosts($endCursorPostId: Int, $searchTerm: String, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
  getPosts(
    endCursorPostId: $endCursorPostId
    searchTerm: $searchTerm
    pageSize: $pageSize
    sortBy: $sortBy
    sortDirection: $sortDirection
  ) {
    items {
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
    ...AllPostsPaginationFieldsFragment
  }
}
    ${AllPostsPaginationFieldsFragmentFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      endCursorPostId: // value for 'endCursorPostId'
 *      searchTerm: // value for 'searchTerm'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export function useGetAllPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsSuspenseQueryHookResult = ReturnType<typeof useGetAllPostsSuspenseQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;