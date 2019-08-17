import gql from 'graphql-tag'
import lotInfoFragment from '../fragments/lotInfo'
import itemInfoFragment from '../fragments/itemInfo'

export const getMoreUserLotsQuery = gql`
  query MoreUserLotsQuery($address: String!, $after: String, $first: Int) {
    userLots(address: $address, after: $after, first: $first) {
      edges {
        cursor
        node {
          ...lotInfo
          item {
            ...itemInfo
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${lotInfoFragment}
  ${itemInfoFragment}
`
