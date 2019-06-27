import React, { Component, ReactNode } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { H1 } from '../../components/globals'
import { RouteComponentProps } from 'react-router'
import { Box } from 'rebass'
import { IAuthContext, withAuthContext } from '../../contexts/auth'
import Items from './components/items'

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
        <Container>
          <H1>Dashboard</H1>
          {user && <Box mb={'lg'}>
            <Items address={user.address} searchString={this.state.searchString}/>
          </Box>}
        </Container>
      </ViewWrapper>
    )
  }
}

export default withAuthContext<TProps>(Dashboard)
