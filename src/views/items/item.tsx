import React, { Component, ReactNode } from 'react'
import { IDefaultResult, IItem } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { getItemByAssetIdQuery } from '../../graphql/queries/getItem'
import { ItemQuery } from '../../graphql/queries/__generated__/ItemQuery'
import ItemDetail from '../../components/itemDetail'
import { Loading } from '../../components/loading'

interface IProps {
  assetId: string
  isPage?: boolean
}

interface IData extends ItemQuery, IDefaultResult {
}

interface IVariables {
  assetId: string
}

type TChildProps = ChildProps<IProps, IData, IVariables>

class Item extends Component<TChildProps> {
  render(): ReactNode {
    const { isPage } = this.props
    const data = this.props.data as IData
    const { loading, error } = data

    if (loading) {
      return <Loading/>
    }

    const item = data.item as IItem

    return <ItemDetail
      item={item}
      isPage={isPage}
    />
  }
}

const withItem = graphql<IProps, IData, IVariables>(getItemByAssetIdQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      assetId: props.assetId,
    },
  }),
})

export default withItem(Item)
