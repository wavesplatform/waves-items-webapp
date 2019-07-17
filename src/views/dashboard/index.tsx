import React, { Component, ReactNode } from 'react'
import { ViewContainer, ViewWrapper } from '../../components/layout'
import { TabItem, TabLink, Tabs, TabsList } from '../../components/globals'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { Box, Flex } from 'rebass'
import ItemListView from './itemList'
import ItemView from './item'
import { GameHeading } from '../../components/game/gameHeading'
import { GameOverview } from './style'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'
import { NavItem } from '../../components/header/style'

interface DashboardParams {
}

type TProps = RouteComponentProps<DashboardParams> & {}

class Dashboard extends Component<WithCurrentUserProps<TProps>> {

  render(): ReactNode {
    const game = this.props.me

    return (
      <ViewWrapper pt={0}>
        <GameOverview>
          <ViewContainer>
            {game && <GameHeading game={game}/>}
          </ViewContainer>
        </GameOverview>
        <Tabs>
          <ViewContainer>
            <Flex justifyContent={'space-between'}>
              <TabsList height={'52px'}>
                <Route path={'/dashboard/items'}>
                  {({ match }) => (
                    <TabItem isActive={!!match}>
                      <TabLink px={'xl'} to={'/dashboard/items'}>Items</TabLink>
                    </TabItem>
                  )}
                </Route>
                <Route path={'/dashboard/item'}>
                  {({ match }) => (
                    <TabItem isActive={!!match}>
                      <TabLink px={'xl'} to={'/dashboard/item'}>Create Item</TabLink>
                    </TabItem>
                  )}
                </Route>
              </TabsList>
            </Flex>
          </ViewContainer>
        </Tabs>
        <ViewContainer>
          <Box py={'lg'}>
            <Switch>
              <Route key='route-dashboard-items' path='/dashboard/items' component={ItemListView}/>
              <Route key='route-dashboard-edit' path='/dashboard/item/:assetId([0-9a-fA-f]{42,44})'
                     component={ItemView}/>
              <Route key='route-dashboard-create' path='/dashboard/item' component={ItemView}/>
              <Redirect from='*' to='/dashboard/items'/>
            </Switch>
          </Box>
        </ViewContainer>
      </ViewWrapper>
    )
  }
}

export default withCurrentUser<TProps>(Dashboard)
