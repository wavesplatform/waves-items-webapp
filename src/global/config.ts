import { FetchPolicy } from 'apollo-boost'

export const config = {
  gqlOptions: {
    options: {
      fetchPolicy: <FetchPolicy>('cache-and-network'),
    },
  },
}

