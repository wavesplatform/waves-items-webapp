import React, { Component, ReactNode } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { H1, H2 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import GamesSlider from '../gamesSlider'

interface IProps extends RouteComponentProps {
}

class HomeView extends Component<IProps> {
  render(): ReactNode {
    return (
      <ViewWrapper>
        <Container>
          <H1>Home</H1>
          <H2>Games</H2>
          <GamesSlider/>
        </Container>
      </ViewWrapper>
    )
  }
}

export default HomeView
