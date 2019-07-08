import React, { Component, ReactNode } from 'react'
import { ViewContainer, ViewWrapper } from '../../components/layout'
import { TabItem, TabLink, Tabs, TabsList } from '../../components/globals'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { Box } from 'rebass'
import { IAuthContext, withAuthContext } from '../../contexts/auth'
import ItemListView from './itemList'
import ItemView from './item'
import { GameHeading } from '../../components/game/gameHeading'
import { GameOverview } from './style'

interface DashboardParams {
}

type TProps = RouteComponentProps<DashboardParams> & {}

class Dashboard extends Component<TProps & IAuthContext> {

  render(): ReactNode {
    const game = this.props.user!

    return (
      <ViewWrapper pt={0}>
        <GameOverview>
          <ViewContainer>
            <GameHeading game={game}/>
          </ViewContainer>
        </GameOverview>
        <Tabs>
          <ViewContainer>
            <TabsList height={'52px'}>
              <TabItem>
                <TabLink px={'xl'} to={'/dashboard/items'}>Items</TabLink>
              </TabItem>
              <TabItem>
                <TabLink px={'xl'} to={'/dashboard/item'}>Create Item</TabLink>
              </TabItem>
            </TabsList>
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

export default withAuthContext<TProps>(Dashboard)
