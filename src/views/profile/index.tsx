import React, { Component, ReactNode } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import Inventory from '../inventory'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'

class Profile extends Component {
  render(): ReactNode {
    return (
      <AuthConsumer>
        {({ user }: IAuthContext) => (
          <ViewWrapper>
            <Container>
              <H1>Profile</H1>
              {user && <Inventory address={user.address}/>}
            </Container>
          </ViewWrapper>
        )}
      </AuthConsumer>
    )
  }
}

export default Profile
