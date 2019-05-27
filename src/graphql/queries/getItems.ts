import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'

export const getItemsQuery = gql`
  query ItemsQuery($filter: ItemFilter) {
    items(filter: $filter, orderBy: timestamp_DESC) {
      ...itemInfo
    }
  }
  ${itemInfoFragment}
`
