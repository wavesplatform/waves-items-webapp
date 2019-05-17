import gql from 'graphql-tag'

export default gql`
  fragment ordersInfo on Item {
    pair {
      amountAsset
      priceAsset
    }
    bids {
      amount
      price
    }
    asks {
      amount
      price
    }
  }
`
