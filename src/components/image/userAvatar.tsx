import React, { Component, ReactNode } from 'react'
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
    const { user } = this.props

    if (user.image) {
      this.imageUri = user.image.icon
    } else {
      this._generateAvatar()
    }
  }

  render(): ReactNode {
    const { user, size } = this.props

    return (
      <UserAvatarContainer>
        {this.imageUri &&
        <Avatar
          variant={size || 'sm'}
          src={this.imageUri}
          alt={`Image ${user.address}`}
        />
        }
      </UserAvatarContainer>
    )
  }

  _generateAvatar(): void {
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
