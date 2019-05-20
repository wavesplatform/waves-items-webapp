import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'

export const getItemsQuery = gql`
  query ItemsQuery {
    items(orderBy: timestamp_DESC) {
      ...itemInfo
    }
  }
  ${itemInfoFragment}
`
