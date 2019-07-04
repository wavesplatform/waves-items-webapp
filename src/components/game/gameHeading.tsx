import { IUser } from '../../types'
import { Box } from 'rebass'
import { UserAvatar } from '../image'
import React from 'react'
import { H1 } from '../globals'
import { Description, Icon, Wrapper } from './style'

interface UserHeadingProps {
  game: IUser
  size?: string
}

export const GameHeading = (props: UserHeadingProps) => {
  const { game, size } = props
  return (
    <Wrapper>
      <Icon>
        <UserAvatar user={game} size={'lg'}/>
      </Icon>
      <Box>
        <H1 mb={'sm'}>{game.name || game.address}</H1>
        <Description>
          As the first full-scale trading card game on mobile, Shadow Era has had a long history of innovation.
        </Description>
      </Box>
    </Wrapper>
  )
}
