import React, { Component, ComponentProps, ReactNode } from 'react'
import cn from 'classnames'
import './GameItem.scss'
import { IGame } from '../../../types'
import UserImage from '../../user/image/UserImage'

const displayName = 'GameItem'

interface IProps extends ComponentProps<'div'> {
  game: IGame
  size?: string
}

export class GameItem extends Component<IProps> {
  render(): ReactNode {
    const { game, size, className } = this.props
    const classes = cn(
      className,
      displayName,
      { [`${displayName}--size-${size}`]: size }
    )

    return (
      <div className={classes}>
        <div className={`${displayName}-body`}>
          <div className={`${displayName}-image`}>
            <UserImage address={game.address} size={size}/>
          </div>
          <div className={`${displayName}-title`}>
            {game.name || game.address}
          </div>
        </div>
      </div>
    )
  }
}

export default GameItem
