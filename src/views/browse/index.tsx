import React, { Component, ReactNode } from 'react'
import { ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import { H1 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import GameOverview from '../gameOverview'
import { Box } from 'rebass'
import { Items } from '../items'

interface BrowseParams {
  address?: string
}

interface IProps extends RouteComponentProps<BrowseParams> {
}

class Browse extends Component<IProps> {
  render(): ReactNode {
    const { match } = this.props
    const { address } = match.params

    return (
      <ViewWrapper py={0}>
        <ViewGrid>
          <ViewSide>
            <GameNav/>
          </ViewSide>
          <ViewContent>
            {address ? <Box mb={'lg'}><GameOverview address={address}/></Box> : <H1>Feed</H1>}
            <Box mb={'lg'}>
              <Items address={address}/>
            </Box>
          </ViewContent>
        </ViewGrid>
      </ViewWrapper>
    )
  }
}

export default Browse
