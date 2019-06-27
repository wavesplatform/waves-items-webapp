import gql from 'graphql-tag'

export default gql`
  fragment userInfo on User {
    id
    address
    name
    image
    role
  }
`
