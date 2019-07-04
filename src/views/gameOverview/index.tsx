import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { getGameQuery } from '../../graphql/queries/getGame'
import { GameQuery, GameQueryVariables } from '../../graphql/queries/__generated__/GameQuery'
import {
  Banner,
  BannerContent,
  BannerImage,
  BannerImageWrapper,
  GameOverviewContainer, Info,
} from './style'
import { Text } from 'rebass'
import { Button } from '../../components/buttons'
import { Redirect } from 'react-router'
import { Loading } from '../../components/loading'
import { GameHeading } from '../../components/game/gameHeading'

interface IProps {
  address: string
}

type TData = GameQuery
type TVariables = GameQueryVariables

type TChildProps = ChildProps<IProps, TData, TVariables>

export class GameOverview extends Component<TChildProps> {
  render(): ReactNode {
    const { user: game, loading, error } = this.props.data!

    if (loading) {
      return <GameOverviewContainer><Loading/></GameOverviewContainer>
    }

    if (!game) {
      return <Redirect to={'/'}/>
    }

    const imagePageUri = game.image && game.image.page

    return (
      <GameOverviewContainer>
        <Banner>
          {imagePageUri && <BannerImageWrapper><BannerImage src={imagePageUri}/></BannerImageWrapper>}
          <BannerContent>
            <GameHeading game={game}/>
          </BannerContent>
        </Banner>
        <Info>
          <Text mb={'base'}>{game.totalItems} items</Text>
          <Button>Start Play</Button>
        </Info>
      </GameOverviewContainer>
    )
  }
}

const withGame = graphql<IProps, TData, TVariables>(getGameQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      address: props.address,
    },
  }),
})

export default withGame(GameOverview)
