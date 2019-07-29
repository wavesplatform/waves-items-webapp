import { IGame } from '../../types'
import { Box } from 'rebass'
import { UserAvatar } from '../image'
import React from 'react'
import { H1 } from '../globals'
import { Description, Icon, Wrapper } from './style'

interface GameHeadingProps {
  game: IGame
  size?: string
}

export const GameHeading = (props: GameHeadingProps) => {
  const { game, size } = props
  const meta = game.meta
  return (
    <Wrapper>
      <Icon>
        <UserAvatar user={game} size={'lg'}/>
      </Icon>
      <Box>
        <H1 mb={'sm'}>{game.name || game.address}</H1>
        <Description>{(meta && meta.description) ? meta.description : 'Decentralized application'}</Description>
      </Box>
    </Wrapper>
  )
}
