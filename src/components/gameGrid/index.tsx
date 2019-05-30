import React from 'react'
import { IGame } from '../../types'
import { GameGridContainer, GameGridLink } from './style'
import { GameCard } from '../gameCard'

interface IGameGridProps {
  games: IGame[]
}

export const GameGrid = (props: IGameGridProps) => {
  const games = props.games.map(game => (
    <GameGridLink
      to={`/items/${game.address}`}
      key={game.id}
    >
      <GameCard game={game}/>
    </GameGridLink>
  ))

  return (
    <GameGridContainer>
      {games}
    </GameGridContainer>
  )
}

export default GameGrid
