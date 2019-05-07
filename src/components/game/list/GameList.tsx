import React, { Component, ComponentProps, ReactNode } from 'react'
import { IGame } from '../../../types'
import cn from 'classnames'
import './GameList.scss'
import { Link } from 'react-router-dom'
import GameItem from '../item/GameItem'
import { ListGroup, ListGroupItem } from '@crutch/components'

const displayName = 'GameList'

interface IGameListProps extends ComponentProps<'div'> {
  games: IGame[]
}

export class GameList extends Component<IGameListProps> {
  render(): ReactNode {
    const {} = this.props
    const classes = cn(
      displayName
    )

    const games = this.props.games.map(game => (
      <ListGroupItem as={Link}
                     className={`${displayName}-item`}
                     to={`/items/${game.address}`}
                     key={game.id}
      >
        <GameItem game={game}/>
      </ListGroupItem>
    ))

    return (
      <ListGroup className={classes}>
        <ListGroupItem as={Link}
                       className={`${displayName}-item`}
                       to={'/items'}
        >
          All Games
        </ListGroupItem>
        {games}
      </ListGroup>
    )
  }
}

export default GameList
