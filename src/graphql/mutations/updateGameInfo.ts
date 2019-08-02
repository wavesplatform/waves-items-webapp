import gql from 'graphql-tag'
import gameInfoFragment from '../fragments/gameInfo'

export const updateGameInfoMutation = gql`
  mutation UpdateGameInfo($input: GameInfo!) {
    updateGameInfo(input: $input) {
      ...gameInfo
    }
  }
  ${gameInfoFragment}
`
