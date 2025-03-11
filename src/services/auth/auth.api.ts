import { picoApi } from '@/services'

import { LoginArgs, ResponseLogin } from './auth.types'

export const authApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<ResponseLogin, LoginArgs>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            localStorage.setItem('accessToken', data.accessToken.trim())

            dispatch(authApi.util.invalidateTags(['Me']))
          } catch (e) {
            // todo: error is catches in baseQueryWithReauth & sigInPage component
            console.error(e, 'Error in login: builder.mutation')
          }
        },
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        async onQueryStarted(_, { dispatch }) {
          localStorage.removeItem('accessToken')
          dispatch(authApi.util.invalidateTags(['Me']))
        },
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation } = authApi
