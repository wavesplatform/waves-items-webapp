import React, { Component, PropsWithChildren, ReactNode } from 'react'
import { Container, Section, ViewContainer, ViewWrapper } from '../../components/layout'
import { RouteComponentProps } from 'react-router'
import GamesSlider from '../gamesSlider'
import {
  DocsCard,
  DocsImage,
  DocsLink,
  HomeContainer,
  ItemsSection,
  ItemsWrapper,
  ItemsWrapperInner,
  SearchSection,
  SearchWrapper,
  SectionTitle,
  Title
} from './style'
import Search from './components/search'
import Items from './components/items'
import { Subscription, timer } from 'rxjs'
import { Box, Flex, LinkProps, Text } from 'rebass'
import { Button } from '../../components/buttons'
import { Link as RouterLink } from 'react-router-dom'
import Stats from './components/stats'
import { Color } from '../../components/globals'
import queryString from 'query-string'
import docsImage from './docs.svg'
import manualImage from './manual.svg'
import { config } from '../../config/config'
import socials from '../../config/socials'

const DocsItem = (props: PropsWithChildren<LinkProps>) => (
  // @ts-ignore
  <DocsLink
    color={'default'}
    {...props}
  >
    <DocsCard
      p={'xl'}
      pr={'100px'}
      borderRadius={'base'}
    >
      {props.children}
    </DocsCard>
  </DocsLink>
)

interface IProps extends RouteComponentProps {
}

class HomeView extends Component<IProps> {
  _searchSub: Subscription

  componentWillUnmount(): void {
    if (this._searchSub) {
      this._searchSub.unsubscribe()
    }
  }

  render(): ReactNode {
    return (
      <ViewWrapper>
        <HomeContainer>
          <SearchSection>
            <Container>
              <Title mb={6}>
                A safe place to trade <Color color={'accent'}>your</Color> digital posessions.
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
                <RouterLink to={'/items'}>
                  <Button size={'lg'} width={'128px'} variant={'primary'}>Show All</Button>
                </RouterLink>
              </Flex>
            </ViewContainer>
          </ItemsSection>
          <Section mb={0} py={6}>
            <ViewContainer>
              <SectionTitle>Popular Games</SectionTitle>
              <GamesSlider/>
            </ViewContainer>
          </Section>
          <Section>
            <ViewContainer>
              <Flex>
                <Box width={1/2} mr={'xl'}>
                  <SectionTitle>Development</SectionTitle>
                  <Text mb={'xl'} color={'grays.3'}>
                    If you have any questions, check out the documentation<br/>
                    or feel free to ask them in the developer chat.
                  </Text>
                  <Flex mb={'xl'}>
                    <DocsItem width={1/2} mr={'lg'} href={`${config.docsUrl}/guides/how-to-use.html`} target='_blank'>
                      Check out this manual
                      <DocsImage src={manualImage}/>
                    </DocsItem>
                    <DocsItem width={1/2} href={`${config.docsUrl}/guides/tokenizing-a-game.html`} target='_blank'>
                      Read the docs
                      <DocsImage src={docsImage}/>
                    </DocsItem>
                  </Flex>
                  <Flex>
                    <DocsLink width={1/2} href={socials.discordUrl} target='_blank'>
                      <Button size={'lg'} width={1}>Ask in developer chat</Button>
                    </DocsLink>
                  </Flex>
                </Box>
                <Box width={1/2}>
                  <SectionTitle>Partnership</SectionTitle>
                  <Text mb={'xl'} color={'grays.3'}>
                    Fill in the form and we will connect with you shortly.
                  </Text>
                  <Flex>
                    <DocsLink flex={'1'} href='https://airtable.com/shr8Z21VbnmoS8Q4c' target='_blank'>
                      <Button variant={'primary'} size={'lg'} width={1}>Fill in the form</Button>
                    </DocsLink>
                  </Flex>
                </Box>
              </Flex>
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
        history.push({
          pathname: '/items',
          search: queryString.stringify({ search: searchString }),
        })
      })
  }
}

export default HomeView
