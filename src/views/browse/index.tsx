import React, { Component, ReactNode } from 'react'
import { Container, ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import Items from '../items'
import { H1 } from '../../components/globals'

class Browse extends Component {
  render(): ReactNode {
    return (
      <ViewWrapper>
        <Container>
          <ViewGrid>
            <ViewSide>
              <GameNav/>
            </ViewSide>
            <ViewContent>
              <H1>Feed</H1>
              <Items/>
            </ViewContent>
          </ViewGrid>
        </Container>
      </ViewWrapper>
    )
  }
}

export default Browse
