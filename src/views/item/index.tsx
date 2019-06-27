import React, { Component, ReactNode } from 'react'
import { ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import { RouteComponentProps } from 'react-router'
import { ItemViewContainer } from './style'
import Item from './components/item'

interface ItemParams {
  assetId: string
}

type TProps = RouteComponentProps<ItemParams> & {}

class ItemView extends Component<TProps> {
  render(): ReactNode {
    const { match } = this.props
    const { assetId } = match.params

    return (
      <ViewWrapper py={0}>
        <ViewGrid>
          <ViewSide>
            <GameNav/>
          </ViewSide>
          <ViewContent>
            <ItemViewContainer>
              <Item assetId={assetId}/>
            </ItemViewContainer>
          </ViewContent>
        </ViewGrid>
      </ViewWrapper>
    )
  }
}

export default ItemView

