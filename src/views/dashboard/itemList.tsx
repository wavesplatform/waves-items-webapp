import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import Items from './components/items'

type TProps = RouteComponentProps & {
  address: string
}

type TState = {
  searchString?: string
}

class ItemListView extends Component<TProps> {
  state: TState = {
    searchString: '',
  }

  render(): ReactNode {
    return (
      <Items address={this.props.address} searchString={this.state.searchString}/>
    )
  }
}

export default ItemListView
