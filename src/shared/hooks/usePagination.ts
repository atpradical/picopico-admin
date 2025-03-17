import { PaginationModel } from '@/services/schema.types'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1
export const PAGE_STEP = 1
export const DEFAULT_TOTAL_COUNT = 0

type PaginationProps = {
  pagination: PaginationModel | undefined
}

type PaginationReturnType = {
  changePage: (page: number) => void
  changePageSize: (value: string) => void
  nextPage: () => void
  prevPage: () => void
}

export const usePagination = ({ pagination }: PaginationProps): PaginationReturnType => {
  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()

  if (!pagination) {
    return {
      changePage: () => {},
      changePageSize: () => {},
      nextPage: () => {},
      prevPage: () => {},
    }
  }

  const nextPage = () => {
    addRouterQueryParamShallow({ pageNumber: (pagination.page + PAGE_STEP).toString() })
  }

  const prevPage = () => {
    addRouterQueryParamShallow({ pageNumber: (pagination.page - PAGE_STEP).toString() })
  }

  const changePage = (page: number) => {
    addRouterQueryParamShallow({ pageNumber: page.toString() })
  }

  const changePageSize = (value: string) => {
    addRouterQueryParamShallow({ pageNumber: DEFAULT_PAGE.toString(), pageSize: value })
  }

  return {
    changePage,
    changePageSize,
    nextPage,
    prevPage,
  }
}
