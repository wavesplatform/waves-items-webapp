import React, { Component, ReactNode } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Header from './components/header'
import styled from 'styled-components'
import { Box } from 'rebass'
import Browse from './views/browse'

export const Body = styled(Box)`
  overflow-x: hidden;
`

class Routes extends Component {
  render(): ReactNode {
    return (
      <Body>
      <Route component={Header}/>
      <Switch>
        <Route key='route-items' path='/items/:address([0-9a-fA-f]{35})' component={Browse}/>
        <Route key='route-items' path='/items' component={Browse}/>
      </Switch>
      </Body>
    )
  }
}

export default Routes
