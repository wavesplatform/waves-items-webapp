import gql from 'graphql-tag'
import userInfoFragment from '../fragments/userInfo'

export const updateUserInfoMutation = gql`
  mutation UpdateUserInfo($input: UserInfo!) {
    updateUserInfo(input: $input) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`
