import gql from 'graphql-tag'
import storeStatsFragment from '../fragments/storeStats'

export const getStoreStatsQuery = gql`
  query StoreStatsQuery {
    storeStats {
      ...storeStats
    }
  }
  ${storeStatsFragment}
`
