import React, { Component, PureComponent, ReactNode, useContext } from 'react'
import { IDefaultResult, IItem } from '../../types'
import { gql } from 'apollo-boost'
import { ChildProps, graphql } from 'react-apollo'
import { ItemQuery } from './__generated__/ItemQuery'
import ItemDetail from '../../components/item/detail/ItemDetail'

interface IProps {
  assetId: string
}

interface IData extends ItemQuery, IDefaultResult {
}

interface IVariables {
  assetId: string
}

type TChildProps = ChildProps<IProps, IData, IVariables>

export class ItemContainer extends PureComponent<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data
    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>

    const item = data.item as IItem
    return <ItemDetail item={item}/>
  }
}

const ITEM_QUERY = gql`
  query ItemQuery($assetId: String!) {
    item(assetId: $assetId) {
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

const withItem = graphql<IProps, IData, IVariables>(ITEM_QUERY, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      assetId: props.assetId,
    },
  }),
})

export default withItem(ItemContainer)
