import React, { Component, ReactNode } from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from '../routes'

class RootContainer extends Component {
  render(): ReactNode {
    return (
      <div className='App'>
        <Router>
          <Switch>
            {routes.map(route => (
              <Route key={`route-${route.name}`} {...route} />
            ))}
          </Switch>
        </Router>
      </div>
    )
  }
}

export default RootContainer
