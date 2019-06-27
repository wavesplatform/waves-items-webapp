import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { getMoreItemsQuery } from '../../../graphql/queries/getItems'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../../graphql/queries/__generated__/MoreItemsQuery'
import { Loading } from '../../../components/loading'
import { ItemsContainer, LoadMoreButton } from '../style'
import ItemTable from '../../../components/itemTable'

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

    if (!connection) {
      return <Loading/>
    }

    const { pageInfo, edges } = connection
    const items = (edges || []).map(edge => edge.node)

    return (
      <ItemsContainer>
        <ItemTable items={items}/>
        {pageInfo.hasNextPage && <LoadMoreButton mt={'lg'} onClick={this._loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load more'}
        </LoadMoreButton>}
      </ItemsContainer>
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
