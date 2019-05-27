import React, { Component, ReactNode } from 'react'
import { ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import { RouteComponentProps } from 'react-router'
import { Item } from '../items'
import { ItemViewContainer } from './style'

interface ItemParams {
  assetId: string
}

interface IProps extends RouteComponentProps<ItemParams> {
}

class ItemView extends Component<IProps> {
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
              <Item assetId={assetId} isPage={true}/>
            </ItemViewContainer>
          </ViewContent>
        </ViewGrid>
      </ViewWrapper>
    )
  }
}

export default ItemView
