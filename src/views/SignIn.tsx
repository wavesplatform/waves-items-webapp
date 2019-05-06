import React, { Component, ReactNode } from 'react'
import cn from 'classnames'
import { Redirect, RouteComponentProps } from 'react-router'
import { SigninForm } from '../components/signin/SigninForm'
import { AuthContext } from '../contexts/auth/AuthContext'
import { Container, Section } from '../components/layout'

const displayName = 'SignIn'

interface IProps extends RouteComponentProps {
}

class SignIn extends Component<IProps> {
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
    const classes = cn(
      displayName
    )

    if (this.context.user) {
      return <Redirect to={this.state.redirectUrl}/>
    }

    return (
      <Section className={classes}>
        <Container>
          <div className={`${displayName}-body`}>
            <h1>Sign In</h1>
            <SigninForm/>
          </div>
        </Container>
      </Section>
    )
  }
}


export default SignIn

