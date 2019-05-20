import gql from 'graphql-tag'

export default gql`
  fragment itemInfo on Item {
    id
    assetId
    name
    quantity
    reissuable
    timestamp
    imageUrl
    game {
      id
      name
      address
    }
  }  
`
