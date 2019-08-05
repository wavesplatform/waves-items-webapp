import React, { Component, ReactNode } from 'react'
import { Container, Section, ViewWrapper } from '../../components/layout'
import { H1, H2 } from '../../components/globals'
import Inventory from '../inventory'
import ToggleTestRole from './components/toggleTestRole'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'
import { UserRole } from '../../__generated__/globalTypes'

class Profile extends Component<WithCurrentUserProps> {
  render(): ReactNode {
    const { me } = this.props
    const isGame = me && me.role === UserRole.GAME

    return (
      <ViewWrapper>
        <Container>
          <H1>Profile</H1>
          <Section>
            <H2>Inventory</H2>
            {me && <Inventory address={me.address}/>}
          </Section>
          {!isGame && <Section>
            <H2>Account Type</H2>
            <ToggleTestRole/>
          </Section>}
        </Container>
      </ViewWrapper>
    )
  }
}

export default withCurrentUser(Profile)
