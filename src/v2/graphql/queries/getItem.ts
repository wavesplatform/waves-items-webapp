import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'
import ordersInfoFragment from '../fragments/ordersInfo'

export const getItemByAssetIdQuery = gql`
  query ItemQuery($assetId: String!) {
    item(assetId: $assetId) {
      ...itemInfo
      ...ordersInfo
    }
  }
  ${itemInfoFragment}
  ${ordersInfoFragment}
`
