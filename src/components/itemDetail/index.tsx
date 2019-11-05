import React, { Component, ReactNode } from 'react'
import { IItem, ItemLot } from '../../types'
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
import { getProfitLot, ProfitPriceType, toWaves } from '../../helpers/order'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../globals'
import OrderModal from '../modals/orderModal'
import defaultImage from '../globals/image.svg'
import withCurrentUser, { WithCurrentUserProps } from '../withCurrentUser'
import { compose } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'
import { miscRecordToArray } from '../../helpers/item'
import Quantity from '../quantity'
import { WavesCy } from '../globals/currencies'
import Price from '../price'

type TProps = {
  item: IItem
  onClose?: () => void
  isPage?: boolean
}

type TState = {
  buyModalShow?: boolean
  sellModalShow?: boolean
}

class ItemDetail extends Component<WithCurrentUserProps<TProps> & RouteComponentProps> {
  static contextType = KeeperContext

  state = {
    buyModalShow: false,
  }

  render(): ReactNode {
    const { item, isPage, me, history, location, onClose } = this.props
    const lots = item.lots || []

    const bestLot = getProfitLot(lots, ProfitPriceType.Min)
    const bestPrice = bestLot && toWaves(bestLot.price)

    // Copy of misc
    const misc = { ...item.misc }
    // Description
    const description = misc['description'] || misc['Description']
    delete misc['description']
    delete misc['Description']

    const imageUrl = item.storageImageUrl || defaultImage

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
              <ParamValue>
                <Quantity value={item.quantity}/>
              </ParamValue>
            </Param>
            {this._miscParams(misc)}
          </Params>
          <Flex justifyContent={'space-between'} flexDirection={'column'}>
            {bestLot && <Button
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
              {bestPrice ? (
                <>Buy for <Price value={bestPrice}/></>
              ) : (
                <>Buy</>
              )}
            </Button>}
            <OrderModal
              item={item}
              type={'buy'}
              defaultPrice={bestPrice && bestPrice.toFixed()}
              lotId={bestLot && bestLot.lotId}
              show={this.state.buyModalShow}
              setShow={this._setShowBuyModal}
            />
          </Flex>
          <Box mt={'base'}>
            {lots.length > 0 && this._lotsTable(lots)}
          </Box>
        </LeftSide>
        <RightSide isPage={isPage}>
          <Overview>
            <ImageWrapper>
              <Image
                src={imageUrl}
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

  _lotsTable = (lots: ItemLot[]) => {
    const list = lots.map(this._priceRow)
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

  _priceRow = ({ stock, price, priceAsset }: ItemLot, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell>{stock}</TableCell>
        <TableCell>{toWaves(price).toFixed()} <WavesCy/></TableCell>
      </TableRow>
    )
  }

  _setShowBuyModal = (value: boolean) => {
    this.setState({
      buyModalShow: value,
    })
  }
}

export default compose(withRouter, withCurrentUser)(ItemDetail)
