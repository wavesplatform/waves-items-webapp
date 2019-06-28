import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import Items from './components/items'
import { IAuthContext, withAuthContext } from '../../contexts/auth'

type TProps = RouteComponentProps

type TState = {
  searchString?: string
}

class ItemListView extends Component<TProps & IAuthContext> {
  state: TState = {
    searchString: '',
  }

  render(): ReactNode {
    const user = this.props.user!

    return (
      <Items address={user.address} searchString={this.state.searchString}/>
    )
  }
}

export default withAuthContext<TProps>(ItemListView)
