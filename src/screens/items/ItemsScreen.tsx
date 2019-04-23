import React, { Component, ReactNode, ComponentType, ComponentClass } from 'react'
import { Container, Section } from '@crutch/components'
import ItemsContainer from '../../containers/items/ItemsContainer'
import Sidebar from '../../components/sidebar/Sidebar'
import GamesContainer from '../../containers/games/GamesContainer'
import cn from 'classnames'
import './ItemsScreen.scss'
import { RouteComponentProps } from 'react-router'
import { ChildProps } from 'react-apollo'

const displayName = 'ItemsScreen'

interface MatchParams {
  address?: string
}

interface IProps extends RouteComponentProps<MatchParams> {
}

interface IVariables {
  address?: string
}

type TChildProps = ChildProps<IProps, {}, IVariables>

class ItemsScreen extends Component<TChildProps> {
  render(): ReactNode {
    const { match } = this.props
    const { address } = match.params

    const classes = cn(
      displayName
    )

    return (
      <Section className={classes}>
        <Container>
          <div className={`${displayName}-body`}>
            <Sidebar className={`${displayName}-side`}>
              <GamesContainer/>
            </Sidebar>
            <div className={`${displayName}-content`}>
              <ItemsContainer address={address}/>
            </div>
          </div>
        </Container>
      </Section>
    )
  }
}

export default ItemsScreen

