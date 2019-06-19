import gql from 'graphql-tag'
import gameInfoFragment from '../fragments/gameInfo'

export const getGameQuery = gql`
  query GameQuery($address: String!) {
    user(address: $address) {
      ...gameInfo
    }
  }
  ${gameInfoFragment}
`
