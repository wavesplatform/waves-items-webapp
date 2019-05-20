import { Component, ReactNode } from 'react'
import React from 'react'
import { Box } from 'rebass'
import { IUser } from '../../types'
import { themeGet } from 'styled-system'
import Avatar from './avatar'
import styled from 'styled-components'

const Identity = require('identity-img')
Identity.config({ rows: 8, cells: 8 })

const UserAvatarContainer = styled(Box)`
  border-radius: 50%;
  overflow: hidden;
  background: ${themeGet('colors.grays.7')};
`

interface IProps {
  user: IUser
  size?: string
}

class UserAvatar extends Component<IProps> {
  imageUri: string

  componentWillMount(): void {
    this._initAvatar()
  }

  render(): ReactNode {
    const { user, size } = this.props

    return (
      <UserAvatarContainer>
        {this.imageUri &&
        <Avatar
          variant={size || 'sm'}
          src={this.imageUri}
          alt={`Avatar ${user.address}`}
        />
        }
      </UserAvatarContainer>
    )
  }

  _initAvatar(): void {
    const { user } = this.props
    if (!user.address) {
      return
    }

    const img = new Image()
    img.src = Identity.create(user.address, { size: 96 })
    this.imageUri = img.src
  }
}

export default UserAvatar
