import { IGame } from '../../../types'
import { Link } from 'react-router-dom'
import React from 'react'
import { ListContainer } from '../../../components/listItems/style'
import { GameListItem } from '../../../components/listItems'
import { UserHeading } from '../../../components/user/userHeading'
import withCurrentUser, { WithCurrentUserProps } from '../../../components/withCurrentUser'
import { UserRole } from '../../../__generated__/globalTypes'

type TProps = {
  games: IGame[]
}

const GameList = (props: WithCurrentUserProps<TProps>) => {
  const { me } = props

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
      {me && me.role === UserRole.TEST && <GameListItem as={Link} to={`/items/${me.address}`}>
        <UserHeading user={me} size={'base'}/>
      </GameListItem>}
      {games}
    </ListContainer>
  )
}

export default withCurrentUser(GameList)
