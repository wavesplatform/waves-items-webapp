import { IUser } from '../../types'
import { Box } from 'rebass'
import { UserAvatar } from '../image'
import React from 'react'
import { Title, Wrapper } from './style'

interface UserHeadingProps {
  user: IUser
  size?: string
}

export const UserHeading = (props: UserHeadingProps) => {
  const { user, size } = props
  return (
    <Wrapper>
      <Box
        mr={size}
      >
        <UserAvatar user={user} size={size}/>
      </Box>
      <Title
        fontSize={size}
        fontWeight={'normal'}
        flex='1'
      >
        {user.name || user.address}
      </Title>
    </Wrapper>
  )
}
