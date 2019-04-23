import React, { Component, ComponentProps, ReactNode } from 'react'
import cn from 'classnames'
import './UserImage.scss'

const Identity = require('identity-img')
Identity.config({ rows: 8, cells: 8 })

const displayName = 'UserImage'

interface IProps {
  address: string
  size?: string
}

export class UserImage extends Component<IProps> {
  imageUri: string

  componentWillMount(): void {
    this._initAvatar()
  }

  render(): ReactNode {
    const { address, size } = this.props
    const classes = cn(
      displayName,
      { [`${displayName}--size-${size}`]: size }
    )

    return (
      <div className={classes}>
        <div className={`${displayName}-body`}>
          {this.imageUri && <img src={this.imageUri} alt={`Avatar ${address}`}/>}
        </div>
      </div>
    )
  }

  private _initAvatar(): void {
    const img = new Image()
    img.src = Identity.create(this.props.address, { size: 96 })
    this.imageUri = img.src
  }
}

export default UserImage
