import { gql } from '@apollo/client'

export const PAGINATION_FRAGMENT = gql`
  fragment PaginationFieldsFragment on PaginationModel {
    pagesCount
    page
    pageSize
    totalCount
  }
`
