import React, { Component, ReactNode } from 'react'
import { ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import { Redirect, RouteComponentProps } from 'react-router'
import SigninForm from '../../components/signinForm'
import { SigninContainer } from './style'
import { Box } from 'rebass'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'

type TProps = RouteComponentProps

class SigninView extends Component<WithCurrentUserProps<TProps>> {

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
    if (this.props.me) {
      return <Redirect to={this.state.redirectUrl}/>
    }

    return (
      <ViewWrapper>
        <SigninContainer>
          <H1>Sign In</H1>
          <Box mb={'lg'}>
            <SigninForm/>
          </Box>
        </SigninContainer>
      </ViewWrapper>
    )
  }
}

export default withCurrentUser<TProps>(SigninView)
