export const config = {
  graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  networkCode: process.env.NETWORK_CODE || 'T',
  authData: 'waves-items',
  
  wavesId: null,

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
}

