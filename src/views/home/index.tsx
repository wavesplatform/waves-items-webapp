import React, { Component, ReactNode } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'

interface IProps extends RouteComponentProps {
}

class HomeView extends Component<IProps> {
  render(): ReactNode {
    return (
      <ViewWrapper>
        <Container>
          <H1>Home</H1>
        </Container>
      </ViewWrapper>
    )
  }
}

export default HomeView
