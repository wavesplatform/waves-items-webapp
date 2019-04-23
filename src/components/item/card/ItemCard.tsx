import React, { Component, ReactNode } from 'react'
import { IItem } from '../../../types'
import cn from 'classnames'
import './ItemCard.scss'
import GameItem from '../../game/item/GameItem'

const displayName = 'ItemCard'

interface IProps {
  item: IItem
}

export class ItemCard extends Component<IProps> {
  render(): ReactNode {
    const { item } = this.props
    const classes = cn(
      displayName
    )

    return (
      <div className={classes}>
        <div className={`${displayName}-top`}>
          <h3 className={`${displayName}-title`}>
            {item.name}
          </h3>
          <div className={`${displayName}-quantity`}>
            {item.quantity}
          </div>
        </div>
        <div className={`${displayName}-body`}>
          <div className={`${displayName}-overview`}>
            <div className={`${displayName}-image`}>
              <img
                src='https://cryptoassault.io/static/unit_0-a16426962578f015561724adb5353968.png'
                alt={`Item #${item.id}`}/>
            </div>
          </div>
        </div>
        <div className={`${displayName}-bottom`}>
          <div className={`${displayName}-details`}>
            <GameItem game={item.game} size={'sm'}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemCard
