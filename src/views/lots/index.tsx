import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { MoreUserLotsQuery, MoreUserLotsQueryVariables } from '../../graphql/queries/__generated__/MoreUserLotsQuery'
import { Loading } from '../../components/loading'
import { NullState } from '../../components/nullState'
import { getMoreUserLotsQuery } from '../../graphql/queries/getUserLots'
import LotTable from '../../components/lotTable'
import { LoadMoreButton } from './style'

type TProps = {
  address: string
}

type TData = MoreUserLotsQuery
type TVariables = MoreUserLotsQueryVariables

type TChildProps = ChildProps<TProps, TData, TVariables>

class Lots extends Component<TChildProps> {
  state = {}

  render(): ReactNode {
    const { loading, error, userLots: connection } = this.props.data!

    if (!connection && loading) {
      return <Loading/>
    }

    const lots =
      connection &&
      connection.edges &&
      connection.edges.length
        ? connection.edges.map(edge => edge.node)
        : []

    const hasNextPage =
      connection &&
      connection.pageInfo &&
      connection.pageInfo.hasNextPage

    if (!lots || !lots.length) {
      return <NullState
        heading={'Lots not found'}
        message={'Here you can see your items for sale'}
      />
    }

    return (
      <>
        <LotTable lots={lots}/>
        {hasNextPage && <LoadMoreButton mt={'lg'} onClick={this._loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load more'}
        </LoadMoreButton>}
      </>
    )
  }

  _loadMore = () => {
    const { fetchMore, variables, userLots: connection } = this.props.data!
    const { pageInfo } = connection!

    fetchMore({
      variables: {
        ...variables,
        after: pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.userLots) {
          return prev
        }

        const prevUserLots = prev.userLots!
        const newEdges = fetchMoreResult.userLots.edges!
        const pageInfo = fetchMoreResult.userLots.pageInfo

        return newEdges.length ? {
          ...prev,
          userLots: {
            ...prevUserLots,
            pageInfo: {
              ...prevUserLots.pageInfo,
              ...pageInfo,
            },
            edges: [
              ...prevUserLots.edges!,
              ...newEdges!,
            ],
          },
        } : prev
      },
    })
  }
}

const withLots = graphql<TProps, TData, TVariables>(getMoreUserLotsQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      address: props.address,
      first: 15,
    },
  }),
})

export default withLots(Lots)
