import React, { ReactNode } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

interface IProps extends RouteProps {
  isSignedIn: boolean,
}

export class ProtectedRoute extends Route<IProps> {
  render(): ReactNode {
    if (!this.props.isSignedIn) {
      return <Redirect to={{
        pathname: '/signin',
        state: { from: this.props.location },
      }}/>
    }

    return <Route {...this.props} />
  }
}

