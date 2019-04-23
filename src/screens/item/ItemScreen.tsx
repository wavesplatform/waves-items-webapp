import React, { Component, ReactNode } from 'react'
import { Container, Section } from '@crutch/components'
import Sidebar from '../../components/sidebar/Sidebar'
import GamesContainer from '../../containers/games/GamesContainer'
import cn from 'classnames'
import './ItemScreen.scss'
import { RouteComponentProps } from 'react-router'
import { ChildProps } from 'react-apollo'
import ItemContainer from '../../containers/item/ItemContainer'

const displayName = 'ItemScreen'

interface MatchParams {
  assetId?: string
}

interface IProps extends RouteComponentProps<MatchParams> {
}

interface IVariables {
  assetId?: string
}

type TChildProps = ChildProps<IProps, {}, IVariables>

class ItemScreen extends Component<TChildProps> {
  render(): ReactNode {
    const { match } = this.props
    const { assetId } = match.params

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
              {assetId && <ItemContainer assetId={assetId}/>}
            </div>
          </div>
        </Container>
      </Section>
    )
  }
}

export default ItemScreen

