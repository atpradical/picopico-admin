import { INITIAL_CURSOR } from '@/features/users/config'
import { GetPostsByUserQuery } from '@/services/posts'
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

//https://www.apollographql.com/docs/react/networking/authentication#header
//https://www.apollographql.com/docs/react/api/link/introduction#directional-composition
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_PICO_GRAPHQL_BASE_URL,
})

const wsLink = new WebSocketLink(
  new SubscriptionClient(process.env.NEXT_PUBLIC_PICO_GRAPHQL_SUBSCRIPTIONS_BASE_URL ?? '', {
    connectionParams: () => {
      const authtoken = localStorage.getItem('token')

      return {
        authorization: authtoken ? `Basic ${authtoken}` : '',
      }
    },
    lazy: true, // Соединение будет установлено только при первой подписке
    reconnect: true,
  })
)

// import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
// import { createClient } from 'graphql-ws'
// new subscriptions format.
// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: 'ws://inctagram.work/api/v1/graphql',
//     connectionParams: () => {
//       let authtoken = localStorage.getItem('token')
//
//       // Удаляем кавычки, если они есть
//       if (authtoken) {
//         // Удаляем все кавычки из строки
//         authtoken = authtoken.replace(/"/g, '')
//       }
//
//       console.log('Cleaned token:', authtoken)
//
//       return {
//         authorization: authtoken ? `Basic ${authtoken}` : '',
//       }
//     },
//   })
// )

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authtoken = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authtoken ? `Basic ${authtoken}` : '',
    },
  }
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: ['searchTerm'],
            merge(existing, incoming, { args }) {
              // Для пагинации (когда есть endCursorPostId не равный INITIAL_CURSOR)
              if (args?.endCursorPostId && args.endCursorPostId !== INITIAL_CURSOR) {
                return {
                  ...incoming,
                  items: [...(existing?.items || []), ...(incoming?.items || [])],
                }
              }

              // Для обновлений от подписок или первого запроса - просто заменяем данные
              return incoming
            },
          },
          getPostsByUser: {
            keyArgs: ['userId'], // Кешируем отдельно для каждого userId
            merge(
              existing: GetPostsByUserQuery['getPostsByUser'] = {
                items: [],
                pageSize: 0,
                pagesCount: 0,
                totalCount: 0,
              },
              incoming: GetPostsByUserQuery['getPostsByUser']
            ) {
              return {
                ...incoming,
                items: [...(existing.items || []), ...(incoming.items || [])],
              }
            },
          },
        },
      },
    },
  }),
  link: splitLink,
})

export default client
