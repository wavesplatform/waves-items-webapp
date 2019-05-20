import React, { Component, ReactNode } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import { Redirect, RouteComponentProps } from 'react-router'
import { AuthContext } from '../../contexts/auth'
import SigninForm from '../../components/signinForm'

interface IProps extends RouteComponentProps {
}

class Signin extends Component<IProps> {
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
        <Container>
          <H1>Sign In</H1>
          <SigninForm/>
        </Container>
      </ViewWrapper>
    )
  }
}

export default Signin
