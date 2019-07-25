import React, { Component, ReactNode } from 'react'
import { Column, IconWrapper, Row } from './style'
import { Icon } from '../../../../components/icon'
import { H3 } from '../../../../components/globals'
import { ChildProps, graphql } from 'react-apollo'
import { StoreStatsQuery } from '../../../../graphql/queries/__generated__/StoreStatsQuery'
import { getStoreStatsQuery } from '../../../../graphql/queries/getStoreStats'
import { Loading } from '../../../../components/loading'

type TProps = {}
type TData = StoreStatsQuery
type TChildProps = ChildProps<TProps, TData>

export class Stats extends Component<TChildProps> {
  render(): ReactNode {
    const { loading, error, storeStats } = this.props.data!

    // if (loading) {
    //   return <Row><Loading/></Row>
    // }

    const { games, items, transactions } = storeStats || { games: 0, items: 0, transactions: 0 }

    return (
      <Row>
        <Column>
          <IconWrapper color={'red'}>
            <Icon glyph={'games'}/>
          </IconWrapper>
          <H3>
            <b>{games}</b> Games
          </H3>
        </Column>
        <Column>
          <IconWrapper color={'blue'}>
            <Icon glyph={'filter'}/>
          </IconWrapper>
          <H3>
            <b>{items}</b> Items
          </H3>
        </Column>
        <Column>
          <IconWrapper color={'orange'}>
            <Icon glyph={'compare_arrows'}/>
          </IconWrapper>
          <H3>
            <b>{transactions}</b> Transactions
          </H3>
        </Column>
      </Row>
    )
  }
}

const withStoreStats = graphql<TProps, TData>(getStoreStatsQuery, {
  options: props => ({
    fetchPolicy: 'cache-first',
  }),
})

export default withStoreStats(Stats)
