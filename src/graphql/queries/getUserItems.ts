import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'

export const getUserItemsQuery = gql`
  query UserItemsQuery($address: String!) {
    userItems(address: $address, orderBy: timestamp_DESC) {
      ...itemInfo
      balance
    }
  }
  ${itemInfoFragment}
`
