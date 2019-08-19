import gql from 'graphql-tag'
import gameInfoFragment from './gameInfo'

export default gql`
  fragment itemInfo on Item {
    id
    assetId
    name
    quantity
    reissuable
    timestamp
    imageUrl
    storageImageUrl
    misc
    game {
      ...gameInfo
    }
  }
  ${gameInfoFragment}
`
