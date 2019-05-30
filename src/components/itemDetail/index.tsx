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
import SellModal from '../modals/sellModal'
import BuyModal from '../modals/buyModal'

interface IProps {
  item: WithOrders<IItem>
  isPage?: boolean
}

interface IState {
  buyModalShow?: boolean,
  sellModalShow?: boolean,
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

    const asksList = asks.map(this._priceRow)
    const bidsList = asks.map(this._priceRow)

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
          <Flex justifyContent={'space-between'}>
            <Button
              onClick={() => {
                this._setShowBuyModal(true)
              }}
              variant='primary'
              width={1 / 2}
            >
              Buy
            </Button>
            <Button
              width={1 / 2}
              ml={2}
              onClick={() => {
                this._setShowSellModal(true)
              }}
            >
              Sell
            </Button>
            <BuyModal item={item}
                      keeperContext={this.context}
                      show={this.state.buyModalShow}
                      setShow={this._setShowBuyModal}
            />
            <SellModal item={item}
                       keeperContext={this.context}
                       show={this.state.sellModalShow}
                       setShow={this._setShowSellModal}
            />
          </Flex>
        </LeftSide>
        <RightSide isPage={isPage}>
          <Overview>
            <ImageWrapper>
              <Image
                src={item.imageUrl ? item.imageUrl : '/image.svg'}
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
