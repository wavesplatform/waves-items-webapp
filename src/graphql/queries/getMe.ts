import gql from 'graphql-tag'
import userInfoFragment from '../fragments/userInfo'

export const getMeQuery = gql`
  query MeQuery {
    me {
      ...userInfo
    }
  }
  ${userInfoFragment}
`
