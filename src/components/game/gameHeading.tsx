import { IGame } from '../../types'
import { Box } from 'rebass'
import { UserAvatar } from '../image'
import React from 'react'
import { H1 } from '../globals'
import { Description, Wrapper } from './style'

interface GameHeadingProps {
  game: IGame
  size?: string
}

export const GameHeading = (props: GameHeadingProps) => {
  const { game, size } = props
  const meta = game.meta
  return (
    <Wrapper>
      <Box mr={'lg'}>
        <UserAvatar user={game} size={'xl'}/>
      </Box>
      <Box>
        <H1 mb={'sm'}>{game.name || game.address}</H1>
        <Description>{(meta && meta.description) ? meta.description : 'Decentralized application'}</Description>
      </Box>
    </Wrapper>
  )
}
