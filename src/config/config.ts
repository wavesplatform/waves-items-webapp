export const config = {
  // GraphQL API endpoint
  graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  networkCode: process.env.REACT_APP_NETWORK_CODE || 'T',
  // Auth data for Keeper
  authData: 'waves-items',
  // Order waves id
  wavesId: 'WAVES',
  // Waves networks config
  chains: {
    // Mainnet
    'W': {
      matcher: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
    },
    // Testnet
    'T': {
      matcher: '8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy',
    },
  },
  docsUrl: process.env.REACT_APP_DOCS_URL || 'http://localhost:8080/',
  exchangeUrl: 'https://coinomat.com/api/v2/indacoin/buy.php',
  images: {
    pageMaxImageSizeByte: 25000000,
    iconMaxImageSizeByte: 5000000,
  },
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || '3N7Lmd1xVWGgdsUJRhRB2z8sRVmL8PowDMi',
}

