import React, { Component, ReactNode } from 'react'
import ItemList from '../itemList/ItemList'
import { IItem } from '../../types'

interface IProps {
  items: IItem[]
}

export class Feed extends Component<IProps> {
  render(): ReactNode {
    return <ItemList items={this.props.items}/>
  }
}

export default Feed
