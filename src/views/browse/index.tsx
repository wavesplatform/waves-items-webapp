import React, { Component, ReactNode } from 'react'
import { ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import { H1 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import GameOverview from '../gameOverview'
import { Box } from 'rebass'
import { Items } from '../items'
import { FiltersContainer } from './style'
import Search from './components/search'

interface BrowseParams {
  address?: string
}

type TState = {
  searchString?: string
}

interface IProps extends RouteComponentProps<BrowseParams> {
}

class Browse extends Component<IProps> {
  state: TState = {
    searchString: '',
  }

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
            <FiltersContainer mb={'lg'}>
              <Search onSearch={(searchString: string) => {
                this.setState({
                  searchString,
                })
              }}/>
            </FiltersContainer>
            <Box mb={'lg'}>
              <Items address={address} searchString={this.state.searchString}/>
            </Box>
          </ViewContent>
        </ViewGrid>
      </ViewWrapper>
    )
  }
}

export default Browse
