import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { IDefaultResult } from '../../../types'
import { getGamesQuery } from '../../graphql/queries/getGames'
import { GameList } from './components/gameList'
import { GamesQuery } from '../../graphql/queries/__generated__/GamesQuery'

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
      return <div>Loading...</div>
    }

    return <GameList games={data.users || []}/>
  }
}

const withGames = graphql<IProps, IData, IVariables>(getGamesQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})

export default withGames(GameNav)
