export const config = {
  production: process.env.REACT_APP_NODE_ENV === 'production',
  // GraphQL API endpoint
  graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  networkCode: process.env.REACT_APP_NETWORK_CODE || 'T',
  // Auth data for Keeper
  authData: 'waves-items',
  // Order waves id
  wavesId: 'WAVES',
  docsUrl: process.env.REACT_APP_DOCS_URL || 'http://localhost:8080',
  exchangeUrl: 'https://coinomat.com/api/v2/indacoin/buy.php',
  images: {
    pageMaxImageSizeByte: 25000000,
    iconMaxImageSizeByte: 5000000,
  },
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || '3MrDcz4LFFjPhXdtu7YCqFSnHc3pD1tcWLa',
}

