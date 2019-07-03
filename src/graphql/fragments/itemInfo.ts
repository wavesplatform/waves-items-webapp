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
    misc
    game {
      ...gameInfo
    }
  }
  ${gameInfoFragment}
`
