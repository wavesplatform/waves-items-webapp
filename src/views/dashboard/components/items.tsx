import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { getMoreItemsQuery } from '../../../graphql/queries/getItems'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../../graphql/queries/__generated__/MoreItemsQuery'
import { Loading } from '../../../components/loading'
import ItemTable from '../../../components/itemTable'
import { LoadMoreButton } from '../style'
import { NullState } from '../../../components/nullState'
import { Text } from 'rebass'
import { Link } from 'react-router-dom'
import { Color } from '../../../components/globals'
import { Button } from '../../../components/buttons'
import { IItem } from '../../../types'

type TProps = {
  address?: string
  searchString?: string
}

type TData = MoreItemsQuery
type TVariables = MoreItemsQueryVariables

type TChildProps = ChildProps<TProps, TData, TVariables>

class Items extends Component<TChildProps> {
  state = {}

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

    const hasNextPage =
      connection &&
      connection.pageInfo &&
      connection.pageInfo.hasNextPage

    if (!items || !items.length) {
      return <NullState
        heading={'Items not found'}
      >
        <Text color={'placeholder'} width={1} textAlign={'center'}>
          You can <Color color={'link'}><Link to={'/dashboard/create-item'}>create</Link></Color> one via dashboard
        </Text>
      </NullState>
    }

    const itemActions = (item: IItem) => (
      <Link to={`/dashboard/item/${item.assetId}`}>
        <Button size={'sm'}>Edit</Button>
      </Link>
    )

    return (
      <>
        <ItemTable items={items} itemActions={itemActions}/>
        {hasNextPage && <LoadMoreButton mt={'lg'} onClick={this._loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load more'}
        </LoadMoreButton>}
      </>
    )
  }

  _loadMore = () => {
    const { fetchMore, variables, items: connection } = this.props.data!
    const { pageInfo } = connection!

    fetchMore({
      variables: {
        ...variables,
        after: pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.items) {
          return prev
        }

        const prevItems = prev.items!
        const newEdges = fetchMoreResult.items.edges!
        const pageInfo = fetchMoreResult.items.pageInfo

        return newEdges.length ? {
          ...prev,
          items: {
            ...prevItems,
            pageInfo: {
              ...prevItems.pageInfo,
              ...pageInfo,
            },
            edges: [
              ...prevItems.edges!,
              ...newEdges!,
            ],
          },
        } : prev
      },
    })
  }
}

const withItems = graphql<TProps, TData, TVariables>(getMoreItemsQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        gameAddress: props.address,
        searchString: props.searchString,
      },
      first: 15,
    },
  }),
})

export default withItems(Items)
