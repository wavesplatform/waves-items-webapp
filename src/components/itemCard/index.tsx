import React from 'react'
import { IItem, WithBalance } from '../../types'
import { UserHeading } from '../user/userHeading'
import { Balance, ImageWrapper, ItemCardContainer, Overview, Title } from './style'
import { Box, Flex, Image } from 'rebass'

interface IItemCardProps {
  item: WithBalance<IItem>
}

export const ItemCard = (props: IItemCardProps) => {
  const { item } = props

  return (
    <ItemCardContainer>
      <Flex p={'lg'}>
        <Title
          flex={'1'}
        >
          {item.name}
        </Title>
        <Box ml={3}>
          {item.balance ? <>
            <Balance
              color={'primary'}
            >
              {item.balance}
            </Balance> / {item.quantity}
          </> : <>
            {item.quantity}
          </>
          }
        </Box>
      </Flex>
      <Box px={'lg'}>
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
      </Box>
      <Box p={'lg'}>
        <Flex>
          <UserHeading user={item.game} size={'sm'}/>
        </Flex>
      </Box>
    </ItemCardContainer>
  )
}
