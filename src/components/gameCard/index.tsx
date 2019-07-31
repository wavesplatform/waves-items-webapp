import React from 'react'
import { IGame } from '../../types'
import { GameCardContainer, Inner, Overview, Image, Title } from './style'
import { Flex, Text } from 'rebass'
import { UserAvatar } from '../image'

export type GameCardStyle = 'base' | 'short'

interface IGameCardProps {
  game: IGame
  style?: GameCardStyle
}

export const GameCard = (props: IGameCardProps) => {
  const { game, style } = props
  const isShort = style === 'short'

  return (
    <GameCardContainer>
      <Overview>
        {game.image && <Image style={{ backgroundImage: `url(${game.image.page})` }}/>}
      </Overview>
      <Inner>
        <Flex>
          <UserAvatar user={game} size={'xl'}/>
        </Flex>
        <Flex flexDirection={'column'}>
          <Title
            mb={'base'}
          >
            {game.name}
          </Title>
          <Text color={'grays.4'}>{game.totalItems} items</Text>
        </Flex>
      </Inner>
    </GameCardContainer>
  )
}
