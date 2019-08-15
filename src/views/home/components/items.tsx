import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import ItemGrid from '../../../components/itemGrid'
import { getMoreItemsQuery } from '../../../graphql/queries/getItems'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../../graphql/queries/__generated__/MoreItemsQuery'
import { Loading } from '../../../components/loading'
import { ItemsContainer } from '../style'
import { UserRole } from '../../../__generated__/globalTypes'
import { NullState } from '../../../components/nullState'

type TProps = {}

type TData = MoreItemsQuery
type TVariables = MoreItemsQueryVariables

type TChildProps = ChildProps<TProps, TData, TVariables>

class Items extends Component<TChildProps> {
  componentDidUpdate(prevProps: Readonly<TChildProps>, prevState: Readonly<{}>, snapshot?: any): void {
  }

  render(): ReactNode {
    const { loading, error, items: connection } = this.props.data!
    if (!connection && loading) {
      return <Loading/>
    }

    const items =
      connection &&
      connection.edges &&
      connection.edges.length
        ? connection.edges.map(edge => edge.node)
        : []

    if (!items || !items.length) {
      return <NullState
        heading={'Items not found'}
        message={'Maybe it hasn\'t been added yet or something\'s broken ;('}
      />
    }

    return (
      <ItemsContainer>
        <ItemGrid items={items}/>
      </ItemsContainer>
    )
  }
}

const withItems = graphql<TProps, TData, TVariables>(getMoreItemsQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        creatorRole: UserRole.GAME,
      },
      first: 6,
    },
  }),
})

export default withItems(Items)
