import gql from 'graphql-tag'
import userInfoFragment from '../fragments/userInfo'

export const updateTestRoleMutation = gql`
  mutation UpdateTestRole($enable: Boolean!) {
    updateTestRole(enable: $enable) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`
