import React, { Component, ReactNode } from 'react'
import { Container, Section, ViewWrapper } from '../../components/layout'
import { H1, H2 } from '../../components/globals'
import Inventory from '../inventory'
import ToggleTestRole from './components/toggleTestRole'
import { withCurrentUser, WithCurrentUserProps } from '../../components/withCurrentUser/currentUser'

class Profile extends Component<WithCurrentUserProps> {
  render(): ReactNode {
    const { me } = this.props

    return (
      <ViewWrapper>
        <Container>
          <H1>Profile</H1>
          <Section>
            <H2>Inventory</H2>
            {me && <Inventory address={me.address}/>}
          </Section>
          <Section>
            <H2>Demo Game</H2>
            <ToggleTestRole/>
          </Section>
        </Container>
      </ViewWrapper>
    )
  }
}

export default withCurrentUser(Profile)
