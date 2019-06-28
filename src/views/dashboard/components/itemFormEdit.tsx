import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { ItemQuery, ItemQueryVariables } from '../../../graphql/queries/__generated__/ItemQuery'
import { getItemByAssetIdQuery } from '../../../graphql/queries/getItem'
import { IItem } from '../../../types'
import { Loading } from '../../../components/loading'
import ItemForm from './itemForm'

type TProps = {
  assetId: string
}

type TData = ItemQuery
type TVariables = ItemQueryVariables
type TChildProps = ChildProps<TProps, TData, TVariables>

class ItemFormEdit extends Component<TChildProps> {
  render(): ReactNode {
    const { data } = this.props
    const { loading, error, item } = data!

    if (loading) {
      return <Loading/>
    }

    return (
      <ItemForm item={item as IItem}/>
    )
  }
}

const withItem = graphql<TProps, TData, TVariables>(getItemByAssetIdQuery, {
  options: props => {
    return {
      fetchPolicy: 'cache-and-network',
      variables: {
        assetId: props.assetId,
      },
    }
  },
})

export default withItem(ItemFormEdit)
