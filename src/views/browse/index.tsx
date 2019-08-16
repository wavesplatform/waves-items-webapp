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
import Inclusions, { inclusionsMap, ItemInclusion } from './components/inclusions'
import queryString from 'query-string'
import { Subject, Subscription, timer } from 'rxjs'
import { debounce } from 'rxjs/operators'

type MatchParams = {
  address?: string
}

type UrlParams = {
  search?: string
  includes?: string
}

type TState = {
  searchString?: string
  inclusions?: ItemInclusion[]
}

type TProps = RouteComponentProps<MatchParams>

class Browse extends Component<TProps> {
  searchParam$ = new Subject<string>()
  searchParamSub: Subscription

  state: TState = {
    searchString: '',
    // Default only sale items
    inclusions: ['sale'],
  }

  constructor(props: TProps) {
    super(props)

    const { location } = this.props

    if (location.search) {
      const { search, includes: includesStr }: UrlParams = queryString.parse(location.search)
      const includes = includesStr && includesStr.split(',')

      // Filter incorrect inclusions
      const validIncludes = includes
        ? includes.filter(v => Object.keys(inclusionsMap).includes(v)) as ItemInclusion[]
        : []

      if (search) {
        this.state.searchString = search
        // Reset to all items if search. It can be override by includes from query params
        this.state.inclusions = []
      }

      if (includesStr !== undefined) {
        this.state.inclusions = validIncludes
      }

      this.searchParam$.next(search)
    }
  }

  componentDidMount(): void {
    this.searchParamSub = this.searchParam$
      .pipe(
        debounce(() => timer(400))
      )
      .subscribe(search => {
        // Update state & url
        this.setState({ searchString: search })
        this._setUrlParams({ search })
      })
  }

  componentWillUnmount(): void {
    if (this.searchParamSub) {
      this.searchParamSub.unsubscribe()
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
              <Search defaultValue={this.state.searchString} onSearch={this._onSearch}/>
            </SearchContainer>
            <FiltersContainer mb={'lg'}>
              <Inclusions inclusions={this.state.inclusions} onChange={this._onInclude}/>
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

  _onSearch = (searchString: string) => {
    // Update search param with delay
    this.searchParam$.next(searchString)
  }

  _onInclude = (inclusions: ItemInclusion[]) => {
    // Instant update state
    this.setState({ inclusions })

    // Instant update url
    this._setUrlParams({ includes: inclusions ? inclusions.join(',') : undefined })
  }

  _setUrlParams = (params: UrlParams) => {
    const { location, history } = this.props

    const queryParams: UrlParams = queryString.parse(location.search)
    history.replace({
      search: queryString.stringify({ ...queryParams, ...params }),
    })
  }
}

export default Browse
