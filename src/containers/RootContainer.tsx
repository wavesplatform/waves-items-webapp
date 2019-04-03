import React, { Component, ReactNode } from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from '../routes'
import Header from '../components/header/Header'

class RootContainer extends Component {
  render(): ReactNode {
    return (
      <Router>
        <div className='App'>
          <Header/>
          <Switch>
            {routes.map(route => (
              <Route key={`route-${route.name}`} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RootContainer
