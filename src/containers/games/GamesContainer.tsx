import React, { Component, ReactNode } from 'react'
import { IDefaultResult } from '../../types'
import { gql } from 'apollo-boost'
import { ChildProps, graphql } from 'react-apollo'
import GameList from '../../components/game/list/GameList'
import { GamesQuery } from './__generated__/GamesQuery'

interface IProps {
}

interface IData extends GamesQuery, IDefaultResult {
}

interface IVariables {
  offset: number
  limit: number
}

type TChildProps = ChildProps<IProps, IData, IVariables>

export class GamesContainer extends Component<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data
    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>

    return <GameList games={data.users || []}/>
  }
}

const GAMES_QUERY = gql`
  query GamesQuery {
    users {
      id
      address
      name
    }
  }
`

const withGames = graphql<IProps, IData, IVariables>(GAMES_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})

export default withGames(GamesContainer)
