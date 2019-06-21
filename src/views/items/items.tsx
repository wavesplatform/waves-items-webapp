import React, { Component, ReactNode } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import ItemGrid from '../../components/itemGrid'
import { FiltersContainer, ItemsContainer, ItemSide, ItemsSide, LoadMoreButton } from './style'
import { Item } from './index'
import { Sticky, StickyContainer } from 'react-sticky'
import { Box } from 'rebass'
import theme from '../../styles/theme'
import { getMoreItemsQuery } from '../../graphql/queries/getItems'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../graphql/queries/__generated__/MoreItemsQuery'
import { Loading } from '../../components/loading'
import { SearchInput } from '../../components/inputs'

interface IProps {
  address?: string
}

type TData = MoreItemsQuery
type TVariables = MoreItemsQueryVariables

type TChildProps = ChildProps<IProps, TData, TVariables>

class Items extends Component<TChildProps> {
  state = {
    selectedAssetId: '',
  }

  componentDidUpdate(prevProps: Readonly<TChildProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.address !== prevProps.address) {
      this.selectAssetId('')
    }
  }

  selectAssetId = (assetId: string): void => {
    this.setState({
      selectedAssetId: assetId,
    })
  }

  render(): ReactNode {
    const { loading, error, items: connection } = this.props.data!
    const assetId = this.state.selectedAssetId

    if (!connection) {
      return <Loading/>
    }

    const { pageInfo, edges } = connection
    const items = (edges || []).map(edge => edge.node)
    const stickyOffset = theme.header.height + theme.space.lg

    if (assetId) {
      // TODO: hook to force update sticky
      window.dispatchEvent(new Event('scroll'))
    }

    return (
      <>
        <FiltersContainer mb={'lg'}>
          <SearchInput placeholder={'Search all items...'}/>
        </FiltersContainer>
        <ItemsContainer>
          <ItemsSide constrain={!!assetId}>
            <ItemGrid items={items} selectItem={this.selectAssetId}/>
            {pageInfo.hasNextPage && <LoadMoreButton mt={'lg'} onClick={this._loadMore} disabled={loading}>
              {loading ? 'Loading...' : 'Load more'}
            </LoadMoreButton>}
          </ItemsSide>
          <ItemSide isActive={!!assetId}>
            <StickyContainer style={{ height: '100%' }}>
              {assetId && <Sticky topOffset={-stickyOffset} bottomOffset={0}>
                {({ style, isSticky, distanceFromTop, distanceFromBottom }) => {
                  return (
                    <Box style={distanceFromBottom > stickyOffset ? {
                      ...style,
                      top: stickyOffset,
                    } : (isSticky && {
                      ...style,
                      position: 'absolute',
                      top: 'auto',
                      left: 'auto',
                      bottom: 0,
                    }) || {}}>
                      <Item assetId={assetId}/>
                    </Box>
                  )
                }}
              </Sticky>}
            </StickyContainer>
          </ItemSide>
        </ItemsContainer>
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

const withItems = graphql<IProps, TData, TVariables>(getMoreItemsQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        gameAddress: props.address,
      },
      first: 20,
    },
  }),
})

export default withItems(Items)
