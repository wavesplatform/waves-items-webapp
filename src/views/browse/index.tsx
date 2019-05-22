import React, { Component, ReactNode } from 'react'
import { Container, ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import Items from '../items'
import { H1 } from '../../components/globals'

class Browse extends Component {
  render(): ReactNode {
    return (
      <ViewWrapper py={0}>
        <ViewGrid>
          <ViewSide>
            <GameNav/>
          </ViewSide>
          <ViewContent>
            <H1>Feed</H1>
            <Items/>
          </ViewContent>
        </ViewGrid>
      </ViewWrapper>
    )
  }
}

export default Browse
