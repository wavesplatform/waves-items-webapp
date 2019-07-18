export const config = {
  // GraphQL API endpoint
  graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  networkCode: process.env.REACT_APP_NETWORK_CODE || 'T',
  // Auth data for Keeper
  authData: 'waves-items',
  // Order waves id
  wavesId: null,
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
  docsUrl: 'https://waves-items-docs.vecheslav.now.sh',
}

