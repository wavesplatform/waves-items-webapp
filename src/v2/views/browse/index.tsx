import React, { Component, ReactNode } from 'react'
import { ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import Items from '../items'


class Browse extends Component {
  render(): ReactNode {
    return (
      <ViewWrapper>
        <ViewGrid>
          <ViewSide>
            <GameNav/>
          </ViewSide>
          <ViewContent>
            <h1>Feed</h1>
            <Items/>
          </ViewContent>
        </ViewGrid>
      </ViewWrapper>
    )
  }
}

export default Browse
