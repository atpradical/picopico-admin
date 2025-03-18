import * as Types from './schema.types'

import { gql } from '@apollo/client'
export type PaginationFieldsFragmentFragment = {
  __typename?: 'PaginationModel'
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
}

export const PaginationFieldsFragmentFragmentDoc = gql`
  fragment PaginationFieldsFragment on PaginationModel {
    pagesCount
    page
    pageSize
    totalCount
  }
`
