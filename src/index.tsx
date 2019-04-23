import React, { Component, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Root from './containers/root/Root'
import { BrowserRouter as Router } from 'react-router-dom'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

class App extends Component {
  render(): ReactNode {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Root/>
        </ApolloProvider>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
