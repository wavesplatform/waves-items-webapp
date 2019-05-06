import React, { Component, ReactNode } from 'react'
import { IDefaultResult } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import ItemGrid from '../../components/item/grid/ItemGrid'
import cn from 'classnames'
import './ItemsContainer.scss'
import gql from 'graphql-tag'
import { ItemsSection } from './style'
import { ViewContent, ViewGrid, ViewSide } from '../../components/layout'
import GamesContainer from '../ItemsScreen'
import Sidebar from '../../components/sidebar/Sidebar'
import { ItemContainer } from '../../containers/item/ItemContainer'

interface IProps {
  address?: string
}

interface IData extends ItemsQuery, IDefaultResult {
}

interface IVariables {
  offset: number
  limit: number
}

type TChildProps = ChildProps<IProps, IData, IVariables>

class ItemsContainer extends Component<TChildProps> {
  state = {
    selectedAssetId: null,
  }

  selectAssetId = (assetId: string): void => {
    this.setState({
      selectedAssetId: assetId,
    })
  }

  render(): ReactNode {
    const { address } = this.props
    const data = this.props.data as IData
    const { loading, error } = data
    const assetId = this.state.selectedAssetId

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <ItemsSection>
        <ViewGrid>
          <ViewSide>
            <Sidebar>
              <GamesContainer/>
            </Sidebar>
          </ViewSide>
          <ViewContent>
            <div className={'content'}>
              <h1>Feed</h1>
              <ItemGrid items={data.items || []} colspan={4} selectItem={this.selectAssetId}/>
            </div>
            <div className={'item'}>
              {assetId && <ItemContainer assetId={assetId}/>}
            </div>
          </ViewContent>
        </ViewGrid>

      </ItemsSection>

    )
  }
}

const ITEMS_QUERY = gql`
  query ItemsQuery {
    items {
      id
      assetId
      name
      quantity
      reissuable
      timestamp
      imageUrl
      game {
        id
        name
        address
      }
    }
  }
`

const withItems = graphql<IProps, IData, IVariables>(ITEMS_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})

export default withItems(ItemsContainer)
