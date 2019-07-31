import React, { Component, ReactNode } from 'react'
import { IUser } from '../../types'
import AvatarImage from './avatar'
import { generateAvatar } from '../../helpers/user'

interface IProps {
  user: IUser
  size?: string
}

class UserAvatar extends Component<IProps> {
  imageUri?: string

  componentWillMount(): void {
    const { user } = this.props

    if (user.image && user.image.icon) {
      this.imageUri = user.image.icon
    } else {
      this.imageUri = generateAvatar(user.address)
    }
  }

  render(): ReactNode {
    const { size } = this.props

    return (
      <AvatarImage
        size={size || 'sm'}
        src={this.imageUri}
      />
    )
  }
}

export default UserAvatar
