import React, { Component, ReactNode } from 'react'
import { IDefaultResult } from '../../../types'
import { ChildProps, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ItemsSection } from './style'
import { ViewContent, ViewGrid, ViewSide } from '../../components/layout'
import { ItemsQuery } from './__generated__/ItemsQuery'

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

class Items extends Component<TChildProps> {
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
            ViewSide
          </ViewSide>
          <ViewContent>
            <h1>Feed</h1>
            Grid
            Item
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

export default withItems(Items)
