import React, { Component, ReactNode } from 'react'
import { ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import GameNav from '../gameNav'
import { H1 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import GameOverview from '../gameOverview'
import { Box } from 'rebass'
import { FiltersContainer, SearchContainer } from './style'
import Search from './components/search'
import Items from './components/items'
import { UserRole } from '../../__generated__/globalTypes'
import Inclusions, { ItemInclusion } from './components/inclusions'

interface BrowseParams {
  address?: string
}

type TState = {
  searchString?: string
  inclusions?: ItemInclusion[]
}

type TProps = RouteComponentProps<BrowseParams>

class Browse extends Component<TProps> {
  state: TState = {
    searchString: '',
    inclusions: ['sale'],
  }

  constructor(props: TProps) {
    super(props)

    const { location } = this.props
    if (location.state !== undefined) {
      this.state.searchString = location.state.searchString
    }
  }

  render(): ReactNode {
    const { match } = this.props
    const { address } = match.params

    // Set GAME role for all items
    const creatorRole = !address ? UserRole.GAME : undefined

    return (
      <ViewWrapper py={0}>
        <ViewGrid>
          <ViewSide>
            <GameNav/>
          </ViewSide>
          <ViewContent>
            {address ? <Box mb={'lg'}><GameOverview address={address}/></Box> : <H1>Feed</H1>}
            <SearchContainer mb={'lg'}>
              <Search defaultValue={this.state.searchString} onSearch={(searchString: string) => {
                this.setState({
                  searchString,
                })
              }}/>
            </SearchContainer>
            <FiltersContainer mb={'lg'}>
              <Inclusions inclusions={this.state.inclusions} onChange={(inclusions: ItemInclusion[]) => {
                this.setState({
                  inclusions,
                })
              }}/>
            </FiltersContainer>
            <Box mb={'lg'}>
              <Items
                address={address}
                searchString={this.state.searchString}
                inclusions={this.state.inclusions}
                creatorRole={creatorRole}/>
            </Box>
          </ViewContent>
        </ViewGrid>
      </ViewWrapper>
    )
  }
}

export default Browse
