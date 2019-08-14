import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'
import lotInfoFragment from '../fragments/lotInfo'

export const getUserItemsQuery = gql`
  query UserItemsQuery($address: String!) {
    userItems(address: $address, orderBy: timestamp_DESC) {
      ...itemInfo
      lots {
        ...lotInfo
      }
      balance
    }
  }
  ${itemInfoFragment}
  ${lotInfoFragment}
`
