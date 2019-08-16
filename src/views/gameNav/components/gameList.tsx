import { IGame } from '../../../types'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import React from 'react'
import { ListContainer } from '../../../components/listItems/style'
import { GameListItem } from '../../../components/listItems'
import { UserHeading } from '../../../components/user/userHeading'
import withCurrentUser, { WithCurrentUserProps } from '../../../components/withCurrentUser'
import { UserRole } from '../../../__generated__/globalTypes'
import { compose } from 'react-apollo'

type TProps = {
  games: IGame[]
}

const GameList = (props: WithCurrentUserProps<TProps & RouteComponentProps>) => {
  const { me, location } = props

  const games = props.games.map(game => (
    <GameListItem as={Link}
                  to={{
                    pathname: `/items/${game.address}`,
                    search: location.search,
                  }}
                  key={game.id}>
      <UserHeading user={game} size={'base'}/>
    </GameListItem>
  ))

  return (
    <ListContainer>
      <GameListItem as={Link} to={{
        pathname: '/items',
        search: location.search,
      }}>
        All Games
      </GameListItem>
      {me && me.role === UserRole.TEST && <GameListItem as={Link} to={{
        pathname: `/items/${me.address}`,
        search: location.search,
      }}>
        <UserHeading user={me} size={'base'}/>
      </GameListItem>}
      {games}
    </ListContainer>
  )
}

export default compose(withCurrentUser, withRouter)(GameList)
