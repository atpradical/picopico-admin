import { GetPostsByUserQuery } from '@/services/posts'
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

//https://www.apollographql.com/docs/react/networking/authentication#header
//https://www.apollographql.com/docs/react/api/link/introduction#directional-composition
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_PICO_GRAPHQL_BASE_URL,
})

const wsLink = new GraphQLWsLink(
  //   TODO: GRAPHQL to fix url for Subsriptions
  createClient({
    url: 'ws://localhost:4000/subscriptions',
  })
)

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
        // Используем Query вместо GET_POSTS_BY_USER
        fields: {
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
