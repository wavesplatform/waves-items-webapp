import React, { Component, ReactNode } from 'react'
import { ViewContainer, ViewWrapper } from '../../components/layout'
import { TabItem, TabLink, Tabs, TabsContainer } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import { Box } from 'rebass'
import { IAuthContext, withAuthContext } from '../../contexts/auth'
import Items from './components/items'
import { GameOverview } from './style'
import { Link } from 'react-router-dom'

interface DashboardParams {
}

type TState = {
  searchString?: string
}

type TProps = RouteComponentProps<DashboardParams> & {}

class Dashboard extends Component<TProps & IAuthContext> {
  state: TState = {
    searchString: '',
  }

  render(): ReactNode {
    const { user } = this.props

    return (
      <ViewWrapper>
        <GameOverview>
          <ViewContainer>
            {user && user.name}
          </ViewContainer>
        </GameOverview>
        <Tabs>
          <TabsContainer height={'52px'} maxWidth={'1280px'}>
            <TabItem>
              <TabLink px={'xl'} to={'/'}>Items</TabLink>
            </TabItem>
            <TabItem>
              <TabLink px={'xl'} to={'/'}>Create Item</TabLink>
            </TabItem>
          </TabsContainer>
        </Tabs>
        <ViewContainer>
          {user && <Box mb={'lg'}>
            <Items address={user.address} searchString={this.state.searchString}/>
          </Box>}
        </ViewContainer>
      </ViewWrapper>
    )
  }
}

export default withAuthContext<TProps>(Dashboard)
