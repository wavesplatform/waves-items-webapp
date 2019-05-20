import React, { Component, ReactNode } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from 'rebass'
import Browse from './views/browse'
import Signin from './views/signin'
import Header from './components/header'
import Profile from './views/profile'

export const Body = styled(Box)`
  overflow-x: hidden;
  height: 100%;
`

class Routes extends Component {
  render(): ReactNode {
    return (
      <Body>
      <Route component={Header}/>
      <Switch>
        <Route exact={true} key='route-home' path='/' component={Browse}/>
        <Route key='route-signin' path='/signin' component={Signin}/>
        {/*Items*/}
        <Route key='route-items' path='/items/:address([0-9a-fA-f]{35})' component={Browse}/>
        <Route key='route-items' path='/items' component={Browse}/>
        <Route key='route-item' path='/item/:assetId([0-9a-fA-f]{44})' component={Browse}/>
        {/*User*/}
        <Route key='route-profile' path='/profile' component={Profile}/>
      </Switch>
      </Body>
    )
  }
}

export default Routes
