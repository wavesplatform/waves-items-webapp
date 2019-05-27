import gql from 'graphql-tag'
import userInfoFragment from '../fragments/userInfo'

export const signinMutation = gql`
  mutation Signin($input: SigninUser!) {
    signin(input: $input) {
      token
      user {
        ...userInfo
      }
    }
  }
  ${userInfoFragment}
`
