import gql from 'graphql-tag'
import userInfoFragment from '../fragments/userInfo'

export const signinMutation = gql`
  mutation Signin($address: String!, $publicKey: String!, $sign: String!) {
    signin(address: $address, publicKey: $publicKey, sign: $sign) {
      token
      user {
        ...userInfo
      }
    }
  }
  ${userInfoFragment}
`
