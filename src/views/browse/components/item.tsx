import React, { Component, ReactNode } from 'react'
import { ItemQuery, ItemQueryVariables } from '../../../graphql/queries/__generated__/ItemQuery'
import { ChildProps } from 'react-apollo'
import ItemDetail from '../../../components/itemDetail'
import { Loading } from '../../../components/loading'
import { IItem } from '../../../types'
import { graphql } from 'react-apollo'
import { getItemByAssetIdQuery } from '../../../graphql/queries/getItem'

type TProps = {
  assetId: string
}

type TData = ItemQuery
type TVariables = ItemQueryVariables
type TChildProps = ChildProps<TProps, TData, TVariables>

class Item extends Component<TChildProps> {
  render(): ReactNode {
    const { loading, error, item } = this.props.data!

    if (loading) {
      return <Loading/>
    }

    return item && <ItemDetail
      item={item as IItem}
      isPage={false}
    />
  }
}

const withItem = graphql<TProps, TData, TVariables>(getItemByAssetIdQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      assetId: props.assetId,
    },
  }),
})

export default withItem(Item)
