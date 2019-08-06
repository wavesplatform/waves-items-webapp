import React, { Component, ReactNode } from 'react'
import { Container, Section, ViewWrapper } from '../../components/layout'
import { H1, H2 } from '../../components/globals'
import Inventory from '../inventory'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'

class Profile extends Component<WithCurrentUserProps> {
  render(): ReactNode {
    const { me } = this.props

    return (
      <ViewWrapper>
        <Container>
          <H1>Inventory</H1>
          <Inventory address={me.address}/>
        </Container>
      </ViewWrapper>
    )
  }
}

export default withCurrentUser(Profile)
