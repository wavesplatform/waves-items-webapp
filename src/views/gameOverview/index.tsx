import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { IDefaultResult, IGame } from '../../types'
import { getGameQuery } from '../../graphql/queries/getGame'
import { GameQuery } from '../../graphql/queries/__generated__/GameQuery'
import {
  Banner,
  BannerContent,
  BannerImage,
  BannerImageWrapper,
  Description,
  GameOverviewContainer,
  Icon,
  Info
} from './style'
import { Box, Text } from 'rebass'
import { H1 } from '../../components/globals'
import { UserAvatar } from '../../components/image'
import { Button } from '../../components/buttons'
import { Redirect } from 'react-router'

interface IProps {
  address: string
}

interface IData extends GameQuery, IDefaultResult {
}

interface IVariables {
  address: string
}

type TChildProps = ChildProps<IProps, IData, IVariables>

export class GameOverview extends Component<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data

    if (loading) {
      return <GameOverviewContainer>Loading...</GameOverviewContainer>
    }

    const game = data.user as IGame
    
    if (!game) {
      return <Redirect to={'/'}/>
    }

    const imagePageUri = game.image && game.image.page

    return (
      <GameOverviewContainer>
        <Banner>
          {imagePageUri && <BannerImageWrapper><BannerImage src={imagePageUri}/></BannerImageWrapper>}
          <BannerContent>
            <Icon>
              <UserAvatar user={game} size={'lg'}/>
            </Icon>
            <Box>
              <H1>{game.name || game.address}</H1>
              <Description>
                As the first full-scale trading card game on mobile, Shadow Era has had a long history of innovation.
              </Description>
            </Box>
          </BannerContent>
        </Banner>
        <Info>
          <Text mb={'base'}>67 items</Text>
          <Button>Start Play</Button>
        </Info>
      </GameOverviewContainer>
    )
  }
}

const withGame = graphql<IProps, IData, IVariables>(getGameQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      address: props.address,
    },
  }),
})

export default withGame(GameOverview)
