import gql from 'graphql-tag'

export default gql`
  fragment gameInfo on User {
    id
    address
    name
    image
    meta
    totalItems
  }
`
