import React, { Component, ReactNode } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import SignIn from './views/signIn/SignIn'
import ItemsScreen from './views/items/ItemsScreen'
import Header from './components/header/Header'
import HomeScreen from './views/home/HomeScreen'
import ItemScreen from './views/item/ItemScreen'
import Layout from './components/layout/Layout'

class Routes extends Component {
  render(): ReactNode {
    return (
      <Layout>
        <Route component={Header}/>
        <Switch>
          <Route exact={true} key='route-home' path='/' component={HomeScreen}/>
          <Route key='route-signin' path='/signin' component={SignIn}/>
          <Route key='route-items' path='/items/:address([0-9a-fA-f]{35})' component={ItemsScreen}/>
          <Route key='route-items' path='/items' component={ItemsScreen}/>
          <Route key='route-item' path='/item/:assetId([0-9a-fA-f]{44})' component={ItemScreen}/>
        </Switch>
      </Layout>
    )
  }
}

export default Routes
