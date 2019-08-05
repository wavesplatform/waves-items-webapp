import React, { Component, ReactNode } from 'react'
import { AmountPrice, IItem, WithOrders } from '../../types'
import { UserHeading } from '../user/userHeading'
import {
  DisplayButton,
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
import { Box, Flex, Image, Link, Text } from 'rebass'
import { KeeperContext } from '../../contexts/keeper'
import { Button } from '../buttons'
import { toWaves } from '../../helpers/order'
import { Table, TableBody, TableCell, TableHeader, TableRow, WavesCy } from '../globals'
import { BigNumber } from '@waves/bignumber'
import OrderModal from '../modals/orderModal'
import defaultImage from '../globals/image.svg'
import withCurrentUser, { WithCurrentUserProps } from '../withCurrentUser'
import { compose } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'
import { miscRecordToArray } from '../../helpers/item'

type TProps = {
  item: WithOrders<IItem>
  onClose?: () => void
  isPage?: boolean
}

type TState = {
  buyModalShow?: boolean
  sellModalShow?: boolean
}

enum ProfitPriceType {
  Min,
  Max,
}

class ItemDetail extends Component<WithCurrentUserProps<TProps> & RouteComponentProps> {
  static contextType = KeeperContext

  state = {
    buyModalShow: false,
    sellModalShow: false,
  }

  render(): ReactNode {
    const { item, isPage, me, history, location, onClose } = this.props
    const asks = item.asks || []
    const bids = item.bids || []

    const minAskPrice = this._getProfitPrice(asks, ProfitPriceType.Min)
    const maxBidPrice = this._getProfitPrice(bids, ProfitPriceType.Max)
    const buyPriceStr = minAskPrice && toWaves(minAskPrice).toFixed()
    const sellPriceStr = maxBidPrice && toWaves(maxBidPrice).toFixed()

    // Description
    const description = item.misc['description'] || item.misc['Description']
    delete item.misc['description']
    delete item.misc['Description']

    return (
      <ItemDetailContainer isPage={isPage}>
        <LeftSide>
          <Flex alignItems={'start'} mb={'lg'} justifyContent={'space-between'}>
            <Title
              mb={0}
              isPage={isPage}
              as={isPage ? 'h1' : 'h2'}
            >
              {item.name}
            </Title>
            {!isPage && <Flex ml={'base'} mt={'2px'}>
              <Link href={`/item/${item.assetId}`} target='_blank'><DisplayButton glyph={'tab_unselected'}/></Link>
              {onClose && <DisplayButton glyph={'call_received'} ml={'xs'} onClick={onClose}/>}
            </Flex>}
          </Flex>
          <Box mb={'lg'}>
            <UserHeading user={item.game} size={'sm'}/>
          </Box>
          {description && <Text color={'grays.2'} mb={'lg'}>{description}</Text>}
          <Params mb={'lg'}>
            <Param>
              <ParamTitle>Quantity</ParamTitle>
              <ParamValue>{item.quantity}</ParamValue>
            </Param>
            {this._miscParams(item.misc)}
          </Params>
          <Flex justifyContent={'space-between'} flexDirection={'column'}>
            <Button
              onClick={() => {
                // Redirect if not auth
                if (!me) {
                  history.push('/signin', { from: location.pathname })
                }

                this._setShowBuyModal(true)
              }}
              variant='primary'
              mb={'base'}
            >
              {buyPriceStr ? `Buy for ${buyPriceStr}` : 'Buy'}
            </Button>
            <Button
              onClick={() => {
                // Redirect if not auth
                if (!me) {
                  history.push('/signin', { from: location.pathname })
                }

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
            {asks.length > 0 && this._ordersTable(asks)}
            {bids.length > 0 && this._ordersTable(bids)}
          </Box>
        </LeftSide>
        <RightSide isPage={isPage}>
          <Overview>
            <ImageWrapper>
              <Image
                src={item.imageUrl ? item.imageUrl : defaultImage}
                alt={`Item #${item.id}`}/>
            </ImageWrapper>
          </Overview>
        </RightSide>
      </ItemDetailContainer>
    )
  }

  _miscParams = (miscRecord: Record<string, any>) => {
    const misc = miscRecordToArray(miscRecord)

    const list = misc.map((miscItem, index) => (
      <Param key={index}>
        <ParamTitle>{miscItem.key}</ParamTitle>
        <ParamValue>{miscItem.value}</ParamValue>
      </Param>
    ))

    return list
  }

  _ordersTable = (orders: AmountPrice[]) => {
    const list = orders.map(this._priceRow)
    return (
      <Table width={1}>
        <TableHeader>
          <TableRow>
            <TableCell width={1 / 3} paddingLeft={0}>Amount</TableCell>
            <TableCell width={2 / 3} paddingLeft={0}>Price</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{list}</TableBody>
      </Table>
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

export default compose(withRouter, withCurrentUser)(ItemDetail)
