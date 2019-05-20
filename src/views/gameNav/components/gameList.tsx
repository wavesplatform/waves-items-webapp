import { IGame } from '../../../types'
import { Link } from 'react-router-dom'
import React from 'react'
import { ListContainer } from '../../../components/listItems/style'
import { GameListItem, ListItem } from '../../../components/listItems'
import { UserHeading } from '../../../components/user/userHeading'

interface GameListProps {
  games: IGame[]
}

export const GameList = (props: GameListProps) => {
  const games = props.games.map(game => (
    <GameListItem as={Link}
                  to={`/items/${game.address}`}
                  key={game.id}>
      <UserHeading user={game} size={'base'}/>
    </GameListItem>
  ))

  return (
    <ListContainer>
      <GameListItem as={Link} to={'/items'}>
        All Games
      </GameListItem>
      {games}
    </ListContainer>
  )
}
