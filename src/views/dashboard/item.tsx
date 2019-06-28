import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import ItemFormEdit from './components/itemFormEdit'
import ItemForm from './components/itemForm'
import { ItemContainer } from './style'

interface ItemParams {
  assetId?: string
}

type TProps = RouteComponentProps<ItemParams>

class ItemView extends Component<TProps> {
  render(): ReactNode {
    const { match } = this.props
    const { assetId } = match.params

    return (
      <ItemContainer>
        {assetId ? <ItemFormEdit assetId={assetId}/> : <ItemForm/>}
      </ItemContainer>
    )
  }
}

export default ItemView
