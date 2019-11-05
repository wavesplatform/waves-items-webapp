import React, { Component, ReactNode } from 'react'
import { Container, Section, ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import Inventory from '../inventory'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'
import { Redirect } from 'react-router'
import Lots from '../lots'

class Profile extends Component<WithCurrentUserProps> {
  render(): ReactNode {
    const { me } = this.props

    if (!me) {
      return <Redirect to={'/signin'}/>
    }

    return (
      <ViewWrapper>
        <Container>
          <Section>
            <H1>Sells</H1>
            <Lots address={me.address}/>
          </Section>
          <Section>
            <H1>Inventory</H1>
            <Inventory address={me.address}/>
          </Section>
        </Container>
      </ViewWrapper>
    )
  }
}

export default withCurrentUser(Profile)
