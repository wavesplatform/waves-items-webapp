import React, { Component, ReactNode } from 'react'
import { ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import { Redirect, RouteComponentProps } from 'react-router'
import { AuthContext } from '../../contexts/auth'
import SigninForm from '../../components/signinForm'
import { SigninContainer } from './style'

interface IProps extends RouteComponentProps {
}

class SigninView extends Component<IProps> {
  static contextType = AuthContext

  state = {
    redirectUrl: '/',
  }

  componentDidMount(): void {
    if (this.props.location.state !== undefined) {
      this.setState({
        redirectUrl: this.props.location.state.from,
      })
    }
  }

  render(): ReactNode {
    if (this.context.user) {
      return <Redirect to={this.state.redirectUrl}/>
    }

    return (
      <ViewWrapper>
        <SigninContainer>
          <H1>Sign In</H1>
          <SigninForm/>
        </SigninContainer>
      </ViewWrapper>
    )
  }
}

export default SigninView
