import React, { Component, ReactNode } from 'react'
import { ViewContainer, ViewWrapper } from '../../components/layout'
import { TabItem, TabLink, Tabs, TabsList } from '../../components/globals'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { Box } from 'rebass'
import { IAuthContext, withAuthContext } from '../../contexts/auth'
import { GameOverview } from './style'
import ItemListView from './itemList'
import ItemView from './item'

interface DashboardParams {
}

type TProps = RouteComponentProps<DashboardParams> & {}

class Dashboard extends Component<TProps & IAuthContext> {

  render(): ReactNode {
    const user = this.props.user!

    return (
      <ViewWrapper>
        <GameOverview>
          <ViewContainer>
            {user.name}
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
              <Route key='route-dashboard-edit' path='/dashboard/item/:assetId([0-9a-fA-f]{44})' component={ItemView}/>
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
