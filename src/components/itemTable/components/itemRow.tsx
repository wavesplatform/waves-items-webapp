import React, { ReactNode } from 'react'
import { IItem } from '../../../types'
import { AssetIdLink, EditLink, ItemMisc, ItemTableCell, ItemTableRow } from '../style'
import { Box, Flex, Text } from 'rebass'
import ItemImage from './itemImage'
import { Link } from 'react-router-dom'
import defaultImage from '../../globals/image.svg'
import { config } from '../../../config/config'
import Quantity from '../../quantity'
import { Button } from '../../buttons'

type TProps = {
  item: IItem
  itemActions: (item: IItem) => ReactNode
}

const imageSize = 24

export const ItemRow = (props: TProps) => {
  const { item } = props
  const imageUrl = item.storageImageUrl || defaultImage

  return (
    <ItemTableRow>
      <ItemTableCell>
        <Link to={`/item/${item.assetId}`}>
          <Flex alignItems={'center'}>
            <Box width={imageSize} mr={'base'}>
              <ItemImage src={imageUrl} size={imageSize}/>
            </Box>
            <Text>{item.name}</Text>
          </Flex>
        </Link>
      </ItemTableCell>
      <ItemTableCell><Quantity value={item.quantity}/></ItemTableCell>
      <ItemTableCell>
        <ItemMisc>{JSON.stringify(item.misc)}</ItemMisc>
      </ItemTableCell>
      <ItemTableCell>
        <AssetIdLink
          href={`https://wavesexplorer.com/${config.networkCode === 'T' ? 'testnet/' : ''}tx/${item.assetId}`}
          target='_blank'
        >
          {item.assetId}
        </AssetIdLink>
      </ItemTableCell>
      <ItemTableCell>{item.timestamp}</ItemTableCell>
      <ItemTableCell>
        {props.itemActions(item)}
      </ItemTableCell>
    </ItemTableRow>
  )
}
