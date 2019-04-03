import React, { Component, Fragment, ReactNode } from 'react'
import { graphql, ChildProps } from 'react-apollo'
import { gql, ApolloError } from 'apollo-boost'
import { FeedQuery } from './__generated__/FeedQuery'
import Feed from '../../components/feed/Feed'
import { IDefaultResult } from '../../types'

interface IProps {
}

interface IData extends FeedQuery, IDefaultResult {
}

interface IVariables {
  offset: number
  limit: number
}

type TChildProps = ChildProps<IProps, IData, IVariables>

@graphql(gql`
  query FeedQuery {
    items {
      id
      assetId
      name
      quantity
      reissuable
      timestamp
      imageUrl
      game {
        id
        name
        address
      }
    }
  }
`, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})
export class FeedPage extends Component<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data
    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>

    return (
      <Fragment>
        <h1>Feed</h1>
        <Feed items={data.items || []}/>
      </Fragment>
    )
  }
}

