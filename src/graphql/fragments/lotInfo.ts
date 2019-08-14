import gql from 'graphql-tag'
import userInfoFragment from './userInfo'

export default gql`
  fragment lotInfo on Lot {
    id
    lotId
    priceAsset
    price
    stock
    seller {
      ...userInfo
    }
  }
  ${userInfoFragment}
`
