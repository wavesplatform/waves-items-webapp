import React, { Component, ReactNode } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import Inventory from '../inventory'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'
import { Redirect } from 'react-router'

class Profile extends Component<WithCurrentUserProps> {
  render(): ReactNode {
    const { me } = this.props

    if (!me) {
      return <Redirect to={'/signin'}/>
    }

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
