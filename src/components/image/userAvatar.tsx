import React, { Component, ReactNode } from 'react'
import { IUser } from '../../types'
import AvatarImage from './avatar'
import { generateAvatar } from '../../helpers/user'

interface IProps {
  user: IUser
  size?: string
}

class UserAvatar extends Component<IProps> {
  render(): ReactNode {
    const { size, user } = this.props

    const imageUri = (user.image && user.image.icon) ? user.image.icon : generateAvatar(user.address)

    return (
      <AvatarImage
        size={size || 'sm'}
        src={imageUri}
      />
    )
  }
}

export default UserAvatar
