import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import Items from './components/items'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'

type TProps = RouteComponentProps

type TState = {
  searchString?: string
}

class ItemListView extends Component<WithCurrentUserProps<TProps>> {
  state: TState = {
    searchString: '',
  }

  render(): ReactNode {
    const user = this.props.me

    return (
      <>
        {user && <Items address={user.address} searchString={this.state.searchString}/>}
      </>
    )
  }
}

export default withCurrentUser<TProps>(ItemListView)
