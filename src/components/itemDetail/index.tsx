import React, { Component, ReactNode } from 'react'
import { AmountPrice, IItem, WithOrders } from '../../types'
import { UserHeading } from '../user/userHeading'
import {
  ImageWrapper,
  ItemDetailContainer,
  LeftSide,
  Overview,
  Param,
  Params,
  ParamTitle, ParamValue,
  RightSide,
  Title,
} from './style'
import { Box, Button, Flex, Image, Text } from 'rebass'
import { KeeperContext } from '../../contexts/keeper'
import keeperHelper, { IWavesNetworkCode } from '../../helpers/keeper'
import { config } from '../../config/config'

interface IProps {
  item: WithOrders<IItem>
}

class ItemDetail extends Component<IProps> {
  static contextType = KeeperContext

  render(): ReactNode {
    const { item } = this.props
    const asks = item.asks || []
    const bids = item.bids || []

    const asksList = asks.map(this._priceRow)
    const bidsList = asks.map(this._priceRow)

    return (
      <ItemDetailContainer>
        <LeftSide>
          <Title
            flex={'1'}
            mb={'lg'}
          >
            {item.name}
          </Title>
          <Box mb={'lg'}>
            <UserHeading user={item.game} size={'sm'}/>
          </Box>
          <Params mb={'lg'}>
            <Param>
              <ParamTitle>Quantity</ParamTitle>
              <ParamValue>{item.quantity}</ParamValue>
            </Param>
          </Params>
          <Flex justifyContent={'space-between'}>
            <Button
              onClick={this._buy}
            >
              Buy
            </Button>
            <Button
              onClick={this._sell}
            >
              Sell
            </Button>
          </Flex>
        </LeftSide>
        <RightSide>
          <Overview>
            <ImageWrapper>
              <Image
                src={
                  item.imageUrl === '#'
                    ? 'https://cryptoassault.io/static/unit_0-a16426962578f015561724adb5353968.png'
                    : item.imageUrl
                }
                alt={`Item #${item.id}`}/>
            </ImageWrapper>
          </Overview>
          <Box>
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
          </Box>
        </RightSide>
      </ItemDetailContainer>
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

    if (!keeperHelper.keeper) {
      return
    }

    const { network } = this.context
    const chain = network && config.chains[network.code as IWavesNetworkCode]

    const order = await keeperHelper.keeper.signAndPublishOrder({
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

    if (!keeperHelper.keeper) {
      return
    }

    const { network } = this.context
    const chain = network && config.chains[network.code as IWavesNetworkCode]

    const order = await keeperHelper.keeper.signAndPublishOrder({
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
