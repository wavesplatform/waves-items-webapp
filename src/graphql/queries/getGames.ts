import gql from 'graphql-tag'
import gameInfoFragment from '../fragments/gameInfo'

export const getGamesQuery = gql`
  query GamesQuery {
    games {
      ...gameInfo
    }
  }
  ${gameInfoFragment}
`
