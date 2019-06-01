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
  ParamTitle,
  ParamValue,
  RightSide,
  Title,
} from './style'
import { Box, Flex, Image } from 'rebass'
import { KeeperContext } from '../../contexts/keeper'
import { Button } from '../buttons'
import { toWaves } from '../../helpers/order'
import { Table, TableBody, TableCell, TableHeader, TableRow, WavesCy } from '../globals'
import { BigNumber } from '@waves/bignumber'
import OrderModal from '../modals/orderModal'

interface IProps {
  item: WithOrders<IItem>
  isPage?: boolean
}

interface IState {
  buyModalShow?: boolean,
  sellModalShow?: boolean,
}

enum ProfitPriceType {
  Min,
  Max,
}

class ItemDetail extends Component<IProps> {
  static contextType = KeeperContext

  state = {
    buyModalShow: false,
    sellModalShow: false,
  }

  render(): ReactNode {
    const { item, isPage } = this.props
    const asks = item.asks || []
    const bids = item.bids || []

    const minAskPrice = this._getProfitPrice(asks, ProfitPriceType.Min)
    const maxBidPrice = this._getProfitPrice(bids, ProfitPriceType.Max)
    const buyPriceStr = minAskPrice && toWaves(minAskPrice).toFixed()
    const sellPriceStr = maxBidPrice && toWaves(maxBidPrice).toFixed()

    const asksList = asks.map(this._priceRow)
    const bidsList = bids.map(this._priceRow)

    return (
      <ItemDetailContainer isPage={isPage}>
        <LeftSide>
          <Title
            flex={'1'}
            mb={'lg'}
            as={isPage ? 'h1' : 'h2'}
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
          <Flex justifyContent={'space-between'} flexDirection={'column'}>
            {buyPriceStr && <Button
              onClick={() => {
                this._setShowBuyModal(true)
              }}
              variant='primary'
              mb={'base'}
            >
              Buy for {buyPriceStr}
            </Button>}
            <Button
              onClick={() => {
                this._setShowSellModal(true)
              }}
            >
              Sell
            </Button>
            <OrderModal
              item={item}
              type={'buy'}
              defaultPrice={buyPriceStr}
              keeperContext={this.context}
              show={this.state.buyModalShow}
              setShow={this._setShowBuyModal}
            />
            <OrderModal
              item={item}
              type={'sell'}
              defaultPrice={sellPriceStr}
              keeperContext={this.context}
              show={this.state.sellModalShow}
              setShow={this._setShowSellModal}
            />
          </Flex>
          <Box mt={'base'}>
            {asks.length > 0 && <Table width={1}>
              <TableHeader>
                <TableRow>
                  <TableCell width={1 / 3}>Amount</TableCell>
                  <TableCell width={2 / 3}>Price</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>{asksList}</TableBody>
            </Table>}
            {bids.length > 0 && <Table width={1}>
              <TableHeader>
                <TableRow>
                  <TableCell width={1 / 3}>Amount</TableCell>
                  <TableCell width={2 / 3}>Price</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>{bidsList}</TableBody>
            </Table>}
          </Box>
        </LeftSide>
        <RightSide isPage={isPage}>
          <Overview>
            <ImageWrapper>
              <Image
                src={item.imageUrl ? item.imageUrl : '/image.svg'}
                alt={`Item #${item.id}`}/>
            </ImageWrapper>
          </Overview>
        </RightSide>
      </ItemDetailContainer>
    )
  }

  _priceRow = ({ amount, price }: AmountPrice, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell>{amount}</TableCell>
        <TableCell>{toWaves(price).toFixed()} <WavesCy/></TableCell>
      </TableRow>
    )
  }

  _getProfitPrice = (orders: AmountPrice[], type: ProfitPriceType): BigNumber | undefined => {
    if (!orders.length) {
      return
    }

    try {
      const initPrice = new BigNumber(orders[0].price)

      return orders.reduce((previousPrice: BigNumber | undefined, currentValue: AmountPrice) => {
        const currentPrice = new BigNumber(currentValue.price)
        if (!previousPrice) {
          return currentPrice
        }

        if (type === ProfitPriceType.Min) {
          return currentPrice.lt(previousPrice) ? currentPrice : previousPrice
        } else if (type === ProfitPriceType.Max) {
          return currentPrice.gt(previousPrice) ? currentPrice : previousPrice
        }
      }, initPrice)
    } catch (err) {
      return
    }
  }

  _setShowBuyModal = (value: boolean) => {
    this.setState({
      buyModalShow: value,
    })
  }

  _setShowSellModal = (value: boolean) => {
    this.setState({
      sellModalShow: value,
    })
  }
}

export default ItemDetail
