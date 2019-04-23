import React, { Component, ComponentProps, ReactNode, SyntheticEvent } from 'react'
import ItemCard from '../card/ItemCard'
import { IItem } from '../../../types'
import cn from 'classnames'
import './ItemGrid.scss'
import { Link } from 'react-router-dom'

const displayName = 'ItemGrid'

interface IItemGridProps {
  items: IItem[]
  colspan?: number
  selectItem?: (assetId: string) => void
}

export class ItemGrid extends Component<IItemGridProps> {
  static defaultProps = {
    path: '',
  }

  render(): ReactNode {
    const { colspan, selectItem } = this.props
    const classes = cn(
      displayName,
      { [`${displayName}--colspan-${colspan}`]: colspan }
    )

    const items = this.props.items.map(item => (
      <Link
        onClick={ev => {
          if (selectItem) {
            ev.stopPropagation()
            ev.preventDefault()
            selectItem(item.assetId)
          }
        }}
        to={`/item/${item.assetId}`}
        className={`${displayName}-item`}
        key={item.id}
      >
        <ItemCard item={item}/>
      </Link>
    ))

    return (
      <div className={classes}>
        {items}
      </div>
    )
  }
}

export default ItemGrid
