import React, { Component, ReactNode } from 'react'
import { IDefaultResult } from '../../types'
import { gql } from 'apollo-boost'
import { ChildProps, graphql } from 'react-apollo'
import ItemGrid from '../../components/item/grid/ItemGrid'
import { ItemsQuery } from './__generated__/ItemsQuery'
import cn from 'classnames'
import ItemContainer from '../item/ItemContainer'
import './ItemsContainer.scss'

const displayName = 'Items'

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

export class ItemsContainer extends Component<TChildProps> {
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

    const classes = cn(
      displayName,
      { [`${displayName}--item`]: assetId }
    )

    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>

    return (
      <div className={classes}>
        <div className={`${displayName}-content`}>
          <h1>Feed</h1>
          <ItemGrid items={data.items || []} colspan={4} selectItem={this.selectAssetId}/>
        </div>
        <div className={`${displayName}-item`}>
          {assetId && <ItemContainer assetId={assetId}/>}
        </div>
      </div>

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
