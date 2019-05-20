import React, { Component, ReactNode } from 'react'
import { IDefaultResult } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { getItemsQuery } from '../../graphql/queries/getItems'
import { ItemsQuery } from '../../graphql/queries/__generated__/ItemsQuery'
import ItemGrid from '../../components/itemGrid'
import Item from '../item'
import { ItemsContainer, ItemSide, ItemsSide } from './style'

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
      <ItemsContainer>
        <ItemsSide constrain={!!assetId}>
          <ItemGrid items={data.items || []} selectItem={this.selectAssetId}/>
        </ItemsSide>
        <ItemSide isActive={!!assetId}>
          {assetId && <Item assetId={assetId}/>}
        </ItemSide>
      </ItemsContainer>
    )
  }
}

const withItems = graphql<IProps, IData, IVariables>(getItemsQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})

export default withItems(Items)
