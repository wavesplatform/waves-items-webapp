import React, { Component, ReactNode } from 'react'
import { IItem } from '../../../types'
import cn from 'classnames'
import './ItemDetail.scss'
import GameItem from '../../game/item/GameItem'

const displayName = 'ItemDetail'

interface IProps {
  item: IItem
}

export class ItemDetail extends Component<IProps> {
  render(): ReactNode {
    const { item } = this.props
    const classes = cn(
      displayName
    )

    return (
      <div className={classes}>
        <div className={`${displayName}-body`}>
          <h2 className={`${displayName}-title`}>
            {item.name}
          </h2>
          <div className={`${displayName}-details`}>
            <GameItem game={item.game}/>
          </div>
          <ul className={`${displayName}-params`}>
            <li className={`${displayName}-quantity`}>
              <h4>Quantity</h4>
              <span>{item.quantity}</span>
            </li>
          </ul>
        </div>
        <div className={`${displayName}-right`}>
          <div className={`${displayName}-overview`}>
            <div className={`${displayName}-image`}>
              <img
                src='https://cryptoassault.io/static/unit_0-a16426962578f015561724adb5353968.png'
                alt={`Item #${item.id}`}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDetail
