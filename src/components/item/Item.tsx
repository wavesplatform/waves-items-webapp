import React, { Component, ReactNode } from 'react'
import { IItem } from '../../types'
import { Card } from 'rebass'
import { Link } from 'react-router-dom'

interface IProps {
  item: IItem
}

export class Item extends Component<IProps> {
  render(): ReactNode {
    const item = this.props.item
    return (
      <Link to={'/'} color='inherit'>
        <Card
          key={item.id}
          p={2}
          border={1}
        >
          {item.id}<br/>
          {item.name}
        </Card>
      </Link>
    )
  }
}

export default Item
