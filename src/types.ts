import { ApolloError } from 'apollo-boost'

export interface DefaultResult {
  loading: boolean
  error?: ApolloError
}
