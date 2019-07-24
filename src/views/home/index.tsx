import React, { Component, ReactNode } from 'react'
import { Container, Section, ViewContainer, ViewWrapper } from '../../components/layout'
import { Color, H1, H2 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import GamesSlider from '../gamesSlider'
import { HomeContainer, ItemsSection, ItemsWrapper, ItemsWrapperInner, SearchContainer, SearchSection } from './style'
import Search from './components/search'
import Items from './components/items'
import { Subscription, timer } from 'rxjs'
import { Box, Flex } from 'rebass'
import { Button } from '../../components/buttons'
import { Link } from 'react-router-dom'

interface IProps extends RouteComponentProps {
}

class HomeView extends Component<IProps> {
  _searchSub: Subscription

  render(): ReactNode {
    const { history } = this.props

    return (
      <ViewWrapper>
        <HomeContainer>
          <SearchSection>
            <Container>
              <H1 mb={6} textAlign={'center'}>Lorem ipsum is <Color color={'grays.5'}>placeholder</Color> text commonly
                used.</H1>
              <SearchContainer>
                <Search onSearch={(searchString: string) => {
                  if (this._searchSub) {
                    this._searchSub.unsubscribe()
                  }

                  if (searchString.length < 3) {
                    return
                  }

                  this._searchSub = timer(1000)
                    .subscribe(() => {
                      history.push('/items', {
                        searchString,
                      })
                    })
                }}/>
              </SearchContainer>
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
                  <Button size={'lg'}>Show All</Button>
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
}

export default HomeView
