import React, { Component, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
// import { AuthProvider } from './contexts/auth/AuthContext'
// import { KeeperProvider } from './contexts/keeper/KeeperContext'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
// import { authService } from './services/auth/AuthService'
// import Routes from './routes'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import auth from './v2/helpers/auth'
import { KeeperProvider } from './v2/contexts/keeper'
import { AuthProvider } from './v2/contexts/auth'
import Routes from './v2/routes'

const authLink = setContext((_, { headers }) => {
  const user = auth.getUser()
  const token = user && auth.getToken(user.address)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const cache = new InMemoryCache()
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

cache.writeData({
  data: {},
})

class App extends Component {
  render(): ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <KeeperProvider>
            <Router>
              <AuthProvider>
                <Routes/>
              </AuthProvider>
            </Router>
          </KeeperProvider>
        </ApolloProvider>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
