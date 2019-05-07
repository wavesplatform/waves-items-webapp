import React, { Component, ReactNode } from 'react'
import { AmountPrice, IItem } from '../../../types'
import cn from 'classnames'
import './ItemDetail.scss'
import GameItem from '../../game/item/GameItem'
import { IWavesNetworkCode, keeperService } from '../../../services/keeper/KeeperService'
import { KeeperContext } from '../../../contexts/keeper/KeeperContext'
import { config } from '../../../config/config'
import { Button } from '@crutch/components'

const displayName = 'ItemDetail'

interface IProps {
  item: IItem
  asks: AmountPrice[]
  bids: AmountPrice[]
}

export class ItemDetail extends Component<IProps> {
  static contextType = KeeperContext

  render(): ReactNode {
    const { item, asks, bids } = this.props
    const classes = cn(
      displayName
    )

    const asksList = asks.map(this._priceRow)
    const bidsList = asks.map(this._priceRow)

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
          <div className={`${displayName}-actions`}>
            <Button onClick={this._buy} size={'lg'} color={'dark'}>Buy</Button>
            <Button onClick={this._sell} size={'lg'}>Sell</Button>
          </div>
        </div>
        <div className={`${displayName}-right`}>
          <div className={`${displayName}-overview`}>
            <div className={`${displayName}-image`}>
              <img
                src={
                  item.imageUrl === '#'
                    ? 'https://cryptoassault.io/static/unit_0-a16426962578f015561724adb5353968.png'
                    : item.imageUrl
                }
                alt={`Item #${item.id}`}/>
            </div>
          </div>
          <div className={`${displayName}-prices`}>
            {asks.length > 0 && <table>
              <thead>
              <tr>
                <th>Amount</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>{asksList}</tbody>
            </table>}
            {bids.length > 0 && <table>
              <thead>
              <tr>
                <th>Amount</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>{bidsList}</tbody>
            </table>}
          </div>
        </div>
      </div>
    )
  }

  _priceRow = ({ amount, price }: AmountPrice, index: number) => (
    <tr key={index}>
      <td>{amount}</td>
      <td>{price}</td>
    </tr>
  )

  _buy = async () => {
    const { item } = this.props

    if (!keeperService.keeper) {
      return
    }

    const { network } = this.context
    const chain = network && config.chains[network.code as IWavesNetworkCode]

    const order = await keeperService.keeper.signAndPublishOrder({
      type: 1002,
      data: {
        matcherPublicKey: chain.matcher,
        orderType: 'buy',
        amount: {
          tokens: '1',
          assetId: item.assetId,
        },
        price: {
          tokens: '0.0000001',
          assetId: config.wavesId,
        },
        matcherFee: {
          tokens: '0.003',
          assetId: config.wavesId,
        },
        expiration: Date.now() + 10000000,
      },
    })
  }

  _sell = async () => {
    const { item } = this.props

    if (!keeperService.keeper) {
      return
    }

    const { network } = this.context
    const chain = network && config.chains[network.code as IWavesNetworkCode]

    const order = await keeperService.keeper.signAndPublishOrder({
      type: 1002,
      data: {
        matcherPublicKey: chain.matcher,
        orderType: 'sell',
        amount: {
          tokens: '1',
          assetId: item.assetId,
        },
        price: {
          tokens: '0.0000001',
          assetId: config.wavesId,
        },
        matcherFee: {
          tokens: '0.003',
          assetId: config.wavesId,
        },
        expiration: Date.now() + 10000000,
      },
    })
  }
}

export default ItemDetail
