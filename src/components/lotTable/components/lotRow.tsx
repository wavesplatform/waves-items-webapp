import React from 'react'
import { ItemLot } from '../../../types'
import { LotId, LotTableCell, LotTableRow, Status } from '../style'
import { Box, Flex, Text } from 'rebass'
import ItemImage from './itemImage'
import { Link } from 'react-router-dom'
import defaultImage from '../../globals/image.svg'
import Quantity from '../../quantity'
import { Button } from '../../buttons'
import Price from '../../price'
import { toWaves } from '../../../helpers/order'
import { cancelLot } from '../../../helpers/item'
import { BigNumber } from '@waves/bignumber'
import TagManager from 'react-gtm-module'

type TProps = {
  lot: ItemLot
}

const imageSize = 24

export const LotRow = (props: TProps) => {
  const lot = props.lot
  const { item } = lot
  const imageUrl = item && item.storageImageUrl || defaultImage

  const stockBn = new BigNumber(lot.stock)

  return (
    <LotTableRow>
      <LotTableCell>
        {item && <Link to={`/item/${item.assetId}`}>
          <Flex alignItems={'center'}>
            <Box width={imageSize} mr={'base'}>
              <ItemImage src={imageUrl} size={imageSize}/>
            </Box>
            <Text>{item.name}</Text>
          </Flex>
        </Link>}
      </LotTableCell>
      <LotTableCell><LotId>{lot.lotId}</LotId></LotTableCell>
      <LotTableCell><Quantity value={lot.stock}/></LotTableCell>
      <LotTableCell><Price value={toWaves(lot.price)}/></LotTableCell>
      <LotTableCell>{lot.priceAsset}</LotTableCell>
      <LotTableCell>{stockBn.gt(0) ? (
        <Status bg={'primary'} color={'default'} fontSize={'xs'}>Open</Status>
      ) : (
        <Status fontSize={'xs'}>Finished</Status>
      )}</LotTableCell>
      <LotTableCell>
        <Button size={'sm'} onClick={() => {
          TagManager.dataLayer({ dataLayer: { event: 'sellcancelledattempt' } })
          // TODO: need a more informative process
          cancelLot(lot.lotId)
        }}>
          Cancel
        </Button>
      </LotTableCell>
    </LotTableRow>
  )
}

