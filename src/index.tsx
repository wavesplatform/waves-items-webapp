import React, { Component, Fragment, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import authHelper from './helpers/auth'
import { KeeperProvider } from './contexts/keeper'
import Routes from './routes'
import { GlobalStyle } from './styles/reset'
import { ApolloLink, from } from 'apollo-link'
import { config } from './config/config'
import * as Sentry from '@sentry/browser'
import { createUploadLink } from 'apollo-upload-client'

// Now test
// Error tracking
Sentry.init({ dsn: 'https://399be5e20c924d8d942a60629865d0aa@sentry.io/1513601' })

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    // const user = authHelper.getUser()
    const token = authHelper.getToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  //@ts-ignore
  return forward(operation)
})

const httpLink = createUploadLink({
  uri: config.graphqlEndpoint,
})

const cache = new InMemoryCache()
const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache,
})


cache.writeData({
  data: {},
})

class App extends Component {
  render(): ReactNode {
    console.info(`GraphQL endpoint: ${config.graphqlEndpoint}`)
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle/>
          <ApolloProvider client={client}>
            <KeeperProvider>
              <Router>
                <Routes/>
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
