import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { GamesQuery } from '../../graphql/queries/__generated__/GamesQuery'
import { getGamesQuery } from '../../graphql/queries/getGames'
import { GameLink, GamesSliderContainer } from './style'
import { GameCard } from '../../components/gameCard'
import { Loading } from '../../components/loading'
import { NullState } from '../../components/nullState'

interface IProps {
}

type TData = GamesQuery
type TVariables = {}

type TChildProps = ChildProps<IProps, TData, TVariables>

class GamesSlider extends Component<TChildProps> {
  render(): ReactNode {
    const { games, loading, error } = this.props.data!

    if (loading) {
      return <Loading/>
    }

    if (!games || !games.length) {
      return <NullState
        heading={'No games here yet...'}
        message={'Maybe it hasn\'t been added yet or something\'s broken ;('}
      />
    }

    const renderGames = games.map(game => (
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

const withGames = graphql<IProps, TData, TVariables>(getGamesQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})

export default withGames(GamesSlider)
