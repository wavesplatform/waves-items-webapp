import React, { Component, ReactNode } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import ItemsScreen from '../../screens/items/ItemsScreen'
import HomeScreen from '../../screens/home/HomeScreen'
import ItemScreen from '../../screens/item/ItemScreen'

class Root extends Component {
  render(): ReactNode {
    return (
      <Layout>
        <Switch>
          <Route exact={true} key='route-home' path='/' component={HomeScreen}/>
          <Route key='route-items' path='/items/:address([0-9a-fA-f]{35})' component={ItemsScreen}/>
          <Route key='route-items' path='/items' component={ItemsScreen}/>
          <Route key='route-item' path='/item/:assetId([0-9a-fA-f]{44})' component={ItemScreen}/>
        </Switch>
      </Layout>
    )
  }
}

export default Root
