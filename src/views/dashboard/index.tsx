import React, { Component, ReactNode } from 'react'
import { ViewContainer, ViewWrapper } from '../../components/layout'
import { TabItem, TabLink, Tabs, TabsList } from '../../components/globals'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { Box, Flex } from 'rebass'
import ItemListView from './itemList'
import ItemView from './item'
import SettingsView from './settings'
import { GameHeading } from '../../components/game/gameHeading'
import { EditButton, GameOverview, GameOverviewContainer } from './style'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'
import authFallback from '../../components/route/authFallback'
import { UserRole } from '../../__generated__/globalTypes'
import EditGameModal from '../../components/modals/editGameModal'

interface DashboardParams {
}

type TProps = RouteComponentProps<DashboardParams> & {}

const ItemsFallback = authFallback(ItemListView, () => (
  <Redirect to={'/dashboard/settings'}/>
), true)

const ItemFallback = authFallback(ItemView, () => (
  <Redirect to={'/dashboard/settings'}/>
), true)

class Dashboard extends Component<WithCurrentUserProps<TProps>> {
  state = {
    editModalShow: false,
  }

  render(): ReactNode {
    const { me } = this.props
    const isGameOrTest = me && me.role && [UserRole.GAME, UserRole.TEST].includes(me.role)

    return (
      <ViewWrapper pt={0}>
        <GameOverview>
          <GameOverviewContainer>
            {me && <GameHeading game={me}/>}
            {isGameOrTest && <EditButton onClick={() => {
              this._setShowEditModal(true)
            }}/>}
          </GameOverviewContainer>
          {isGameOrTest && <EditGameModal
            game={me}
            show={this.state.editModalShow}
            setShow={this._setShowEditModal}
          />}
        </GameOverview>
        <Tabs>
          <ViewContainer>
            <Flex justifyContent={'space-between'}>
              <TabsList height={'52px'}>
                <Route path={'/dashboard/settings'}>
                  {({ match }) => (
                    <TabItem isActive={!!match}>
                      <TabLink px={'xl'} to={'/dashboard/settings'}>Settings</TabLink>
                    </TabItem>
                  )}
                </Route>
                {isGameOrTest && <>
                  <Route path={'/dashboard/items'}>
                    {({ match }) => (
                      <TabItem isActive={!!match}>
                        <TabLink px={'xl'} to={'/dashboard/items'}>Items</TabLink>
                      </TabItem>
                    )}
                  </Route>
                  <Route path={'/dashboard/create-item'}>
                    {({ match }) => (
                      <TabItem isActive={!!match}>
                        <TabLink px={'xl'} to={'/dashboard/create-item'}>Create Item</TabLink>
                      </TabItem>
                    )}
                  </Route></>
                }
              </TabsList>
            </Flex>
          </ViewContainer>
        </Tabs>
        <ViewContainer>
          <Box py={'lg'}>
            <Switch>
              <Route key='route-dashboard-items' path='/dashboard/items' component={ItemsFallback}/>
              <Route key='route-dashboard-edit' path='/dashboard/item/:assetId([0-9a-fA-f]{42,44})'
                     component={ItemFallback}/>
              <Route key='route-dashboard-create' path='/dashboard/create-item' component={ItemFallback}/>
              <Route key='route-dashboard-settings' path='/dashboard/settings' component={SettingsView}/>
              <Redirect from='*' to='/dashboard/settings'/>
            </Switch>
          </Box>
        </ViewContainer>
      </ViewWrapper>
    )
  }

  _setShowEditModal = (value: boolean) => {
    this.setState({
      editModalShow: value,
    })
  }
}

export default withCurrentUser<TProps>(Dashboard)
