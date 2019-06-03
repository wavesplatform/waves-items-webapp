import React, { Component, ReactNode } from 'react'
import { IDefaultResult, IGame, IItem } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { GamesQuery } from '../../graphql/queries/__generated__/GamesQuery'
import { getGamesQuery } from '../../graphql/queries/getGames'
import { GameLink, GamesSliderContainer } from './style'
import { GameCard } from '../../components/gameCard'

interface IProps {
}

interface IData extends GamesQuery, IDefaultResult {
}

interface IVariables {
}

type TChildProps = ChildProps<IProps, IData, IVariables>

class GamesSlider extends Component<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data

    if (loading) {
      return <div>Loading...</div>
    }

    const games = data.games as IGame[]
    const renderGames = (games || []).map(game => (
      <GameLink
        to={`/items/${game.address}`}
        key={game.id}
      >
        <GameCard game={game}/>
      </GameLink>
    ))

    return (
      <GamesSliderContainer>
        {renderGames}
      </GamesSliderContainer>
    )
  }
}

const withGames = graphql<IProps, IData, IVariables>(getGamesQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})

export default withGames(GamesSlider)
