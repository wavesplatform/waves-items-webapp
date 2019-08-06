import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import { SettingsContainer } from './style'
import { Section } from '../../components/layout'
import { H2 } from '../../components/globals'
import ToggleTestRole from './components/toggleTestRole'
import { UserRole } from '../../__generated__/globalTypes'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'

interface ItemParams {
  assetId?: string
}

type TProps = RouteComponentProps<ItemParams>

class SettingsView extends Component<WithCurrentUserProps<TProps>> {
  render(): ReactNode {
    const { match, me } = this.props

    const isGame = me && me.role === UserRole.GAME

    return (
      <SettingsContainer>
        {!isGame && <Section>
          <H2>Account Type</H2>
          <ToggleTestRole/>
        </Section>}
      </SettingsContainer>
    )
  }
}

export default withCurrentUser(SettingsView)
