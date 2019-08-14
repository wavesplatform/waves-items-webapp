import React from 'react'
import { IItem, WithBalance } from '../../types'
import { UserHeading } from '../user/userHeading'
import { Balance, ImageWrapper, ItemCardContainer, Overview, Title } from './style'
import { Box, Flex, Image } from 'rebass'
import defaultImage from '../globals/image.svg'
import Quantity from '../quantity'
import { getProfitLot, ProfitPriceType, toWaves } from '../../helpers/order'
import { WavesCyIcon } from '../globals/currencies'
import { Color } from '../globals'
import { Icon } from '../icon'
import Price from '../price'

export type ItemCardStyle = 'base' | 'short'

interface IItemCardProps {
  item: WithBalance<IItem>
  style?: ItemCardStyle
}

export const ItemCard = (props: IItemCardProps) => {
  const { item, style } = props
  const isShort = style === 'short'

  const lots = item.lots || []
  const bestLot = getProfitLot(lots, ProfitPriceType.Min)
  const bestPrice = bestLot && toWaves(bestLot.price)

  return (
    <ItemCardContainer>
      {!isShort && <Flex px={'lg'} pt={'lg'}>
        <Title
          flex={'1'}
        >
          {item.name}
        </Title>
        <Box ml={3}>
          {item.balance ? <>
            <Balance
              color={'grays.4'}
            >
              {item.balance}
            </Balance> / {item.quantity}
          </> : <>
            <Quantity value={item.quantity}/>
          </>
          }
        </Box>
      </Flex>}
      <Box p={'lg'}>
        <Overview>
          <ImageWrapper>
            <Image
              src={item.imageUrl ? item.imageUrl : defaultImage}
              alt={`Item #${item.id}`}/>
          </ImageWrapper>
        </Overview>
      </Box>
      <Box px={'lg'} pb={'lg'}>
        {!isShort && <Flex justifyContent={'space-between'}>
          <UserHeading user={item.game} size={'sm'}/>
          {bestPrice && <Price value={bestPrice}/>}
        </Flex>}
        {isShort && item.balance && <Box>
          <Balance color={'grays.4'}>{item.balance}</Balance> / {item.quantity}
        </Box>}
      </Box>
    </ItemCardContainer>
  )
}
