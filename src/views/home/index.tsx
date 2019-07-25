import React, { Component, ReactNode } from 'react'
import { Container, Section, ViewContainer, ViewWrapper } from '../../components/layout'
import { Color, H1, H2 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import GamesSlider from '../gamesSlider'
import {
  HomeContainer,
  ItemsSection,
  ItemsWrapper,
  ItemsWrapperInner,
  SearchWrapper,
  SearchSection,
  Title
} from './style'
import Search from './components/search'
import Items from './components/items'
import { Subscription, timer } from 'rxjs'
import { Box, Flex } from 'rebass'
import { Button } from '../../components/buttons'
import { Link } from 'react-router-dom'
import Stats from './components/stats'

interface IProps extends RouteComponentProps {
}

class HomeView extends Component<IProps> {
  _searchSub: Subscription

  render(): ReactNode {
    return (
      <ViewWrapper>
        <HomeContainer>
          <SearchSection>
            <Container>
              <Title mb={6}>
                Lorem ipsum is <Color color={'#587CD9'}>placeholder</Color> text commonly used.
              </Title>
              <SearchWrapper>
                <Search onSearch={this._onSearch}/>
              </SearchWrapper>
              <Box mt={6}>
                <Stats/>
              </Box>
            </Container>
          </SearchSection>
          <ItemsSection>
            <ViewContainer>
              <Box mt={6}>
                <ItemsWrapper>
                  <ItemsWrapperInner>
                    <Items/>
                  </ItemsWrapperInner>
                </ItemsWrapper>
              </Box>
              <Flex mt={'xl'} justifyContent={'center'}>
                <Link to={'/items'}>
                  <Button size={'lg'} width={'128px'}>Show All</Button>
                </Link>
              </Flex>
            </ViewContainer>
          </ItemsSection>
          <Section mb={0} py={6}>
            <ViewContainer>
              <H2>Popular Games</H2>
              <GamesSlider/>
            </ViewContainer>
          </Section>
        </HomeContainer>
      </ViewWrapper>
    )
  }

  _onSearch = (searchString: string) => {
    const { history } = this.props

    if (this._searchSub) {
      this._searchSub.unsubscribe()
    }

    if (searchString.length < 3) {
      return
    }

    this._searchSub = timer(200)
      .subscribe(() => {
        history.push('/items', {
          searchString,
        })
      })
  }
}

export default HomeView
