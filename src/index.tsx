import React, { Component, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import RootContainer from './containers/RootContainer'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from './theme'
import { fontFamily, FontFamilyProps, lineHeight, LineHeightProps } from 'styled-system'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const Style = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin:0; }
`

type RootProps = FontFamilyProps & LineHeightProps

const Root = styled.div<RootProps>`
  ${fontFamily}
  ${lineHeight}
`

Root.defaultProps = {
  fontFamily: 'sansSerif',
  lineHeight: 'solid',
}

class App extends Component {
  render(): ReactNode {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Root>
            <Style/>
            <RootContainer/>
          </Root>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
