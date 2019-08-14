import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'
import lotInfoFragment from '../fragments/lotInfo'

export const getItemByAssetIdQuery = gql`
  query ItemQuery($assetId: String!) {
    item(assetId: $assetId) {
      ...itemInfo
      lots {
        ...lotInfo
      }
    }
  }
  ${itemInfoFragment}
  ${lotInfoFragment}
`
