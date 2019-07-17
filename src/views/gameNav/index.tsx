import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { IDefaultResult, IGame } from '../../types'
import { getGamesQuery } from '../../graphql/queries/getGames'
import { GamesQuery } from '../../graphql/queries/__generated__/GamesQuery'
import { Loading } from '../../components/loading'
import GameList from './components/gameList'

interface IProps {
}

interface IData extends GamesQuery, IDefaultResult {
}

interface IVariables {
  offset: number
  limit: number
}

type TChildProps = ChildProps<IProps, IData, IVariables>

export class GameNav extends Component<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data

    if (loading) {
      return <Loading/>
    }

    const games = data.games as IGame[]
    return <GameList games={games || []}/>
  }
}

const withGames = graphql<IProps, IData, IVariables>(getGamesQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})

export default withGames(GameNav)
