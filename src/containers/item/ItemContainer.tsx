import React, { Component, ReactNode } from 'react'
import { IDefaultResult, IItem } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { ItemQuery, ItemQuery_item } from './__generated__/ItemQuery'
import ItemDetail from '../../components/item/detail/ItemDetail'
import gql from 'graphql-tag'

interface IProps {
  assetId: string
}

interface IData extends ItemQuery, IDefaultResult {
}

interface IVariables {
  assetId: string
}

type TChildProps = ChildProps<IProps, IData, IVariables>

export class ItemContainer extends Component<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data

    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>

    const itemWithOrder = data.item as ItemQuery_item
    const item = itemWithOrder.item as IItem
    const bids = itemWithOrder.bids && itemWithOrder.bids.map(({ amount, price }) => ({ amount, price }))
    const asks = itemWithOrder.asks && itemWithOrder.asks.map(({ amount, price }) => ({ amount, price }))

    return <ItemDetail
      item={item}
      asks={asks || []}
      bids={bids || []}
    />
  }
}

const ITEM_QUERY = gql`
  query ItemQuery($assetId: String!) {
    item(assetId: $assetId) {
      item {
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
      pair {
        amountAsset
        priceAsset
      }
      bids {
        amount
        price
      }
      asks {
        amount
        price
      }
    }
  }
`

const withItem = graphql<IProps, IData, IVariables>(ITEM_QUERY, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      assetId: props.assetId,
    },
  }),
})

export default withItem(ItemContainer)
