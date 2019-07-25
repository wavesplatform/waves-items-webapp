import gql from 'graphql-tag'

export default gql`
  fragment storeStats on StoreStats {
    games
    items
    transactions
  }
`
