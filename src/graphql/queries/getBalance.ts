import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'

export const getBalanceQuery = gql`
  query BalanceQuery($address: String!) {
    balance(address: $address, orderBy: timestamp_DESC) {
      ...itemInfo
      balance
    }
  }
  ${itemInfoFragment}
`
