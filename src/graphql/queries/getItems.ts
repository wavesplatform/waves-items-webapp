import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'
import lotInfoFragment from '../fragments/lotInfo'

export const getMoreItemsQuery = gql`
  query MoreItemsQuery($filter: ItemFilter, $after: String, $first: Int) {
    items(filter: $filter, orderBy: timestamp_DESC, after: $after, first: $first) {
      edges {
        cursor
        node {
          ...itemInfo
          lots {
            ...lotInfo
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${itemInfoFragment}
  ${lotInfoFragment}
`
