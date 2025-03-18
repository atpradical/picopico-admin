import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1
export const PAGE_STEP = 1
export const DEFAULT_TOTAL_COUNT = 0

type PaginationProps = {
  page: number
}

type PaginationReturnType = {
  changePage: (page: number) => void
  changePageSize: (value: string) => void
  nextPage: () => void
  prevPage: () => void
}

export const usePagination = ({ page }: PaginationProps): PaginationReturnType => {
  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()

  const nextPage = () => {
    addRouterQueryParamShallow({ pageNumber: (page + PAGE_STEP).toString() })
  }

  const prevPage = () => {
    addRouterQueryParamShallow({ pageNumber: (page - PAGE_STEP).toString() })
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
