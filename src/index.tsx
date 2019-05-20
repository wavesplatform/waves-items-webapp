import React, { Component, ReactNode, Fragment } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import authHelper from './helpers/auth'
import { KeeperProvider } from './contexts/keeper'
import { AuthProvider } from './contexts/auth'
import Routes from './routes'
import { GlobalStyle } from './styles/reset'

const authLink = setContext((_, { headers }) => {
  const user = authHelper.getUser()
  const token = user && authHelper.getToken(user.address)

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
        <Fragment>
          <GlobalStyle/>
          <ApolloProvider client={client}>
            <KeeperProvider>
              <Router>
                <AuthProvider>
                  <Routes/>
                </AuthProvider>
              </Router>
            </KeeperProvider>
          </ApolloProvider>
        </Fragment>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
