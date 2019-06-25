import React, { Component, ReactNode } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from 'rebass'
import Browse from './views/browse'
import SigninView from './views/signin'
import Header from './components/header'
import Profile from './views/profile'
import HomeView from './views/home'
import ItemView from './views/item'
import Footer from './components/footer'
import PagesView from './views/pages'

export const Body = styled(Box)`
  position: relative;
  overflow-x: hidden;
  min-height: 100%;
  padding-bottom: 6rem;
`

class Routes extends Component {
  render(): ReactNode {
    return (
      <Body>
      <Route component={Header}/>
      <Switch>
        <Route exact={true} key='route-home' path='/' component={HomeView}/>

        {/*Pages*/}
        <Route key='route-about' path='/about' component={PagesView}/>
        <Route key='route-develop' path='/develop' component={PagesView}/>

        {/*Items*/}
        <Route key='route-items' path='/items/:address([0-9a-fA-f]{35})' component={Browse}/>
        <Route key='route-items' path='/items' component={Browse}/>
        <Route key='route-item' path='/item/:assetId([0-9a-fA-f]{44})' component={ItemView}/>

        {/*User*/}
        <Route key='route-signin' path='/signin' component={SigninView}/>
        <Route key='route-profile' path='/profile' component={Profile}/>
      </Switch>
      <Route component={Footer}/>
      </Body>
    )
  }
}

export default Routes
