import React, { Component, Fragment, ReactNode } from 'react'
import { graphql, ChildProps } from 'react-apollo'
import { gql, ApolloError } from 'apollo-boost'
import './FeedPage.scss'
import { FeedQuery } from './__generated__/FeedQuery'

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      name
      game {
        name
      }
    }
  }
`

interface IProps {}

interface IData extends FeedQuery {
  loading: boolean
  error: ApolloError
}

interface IVariables {
  offset: number
  limit: number
}

type TChildProps = ChildProps<IProps, IData, IVariables>

class FeedPage extends Component<TChildProps> {
  render(): ReactNode {
    const { loading, feed, error } = this.props.data as IData
    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>

    const items = feed.map(item => (
      <p key={item.id}>
        <>
          {item.id}: {item.name}
        </>
      </p>
    ))

    return (
      <Fragment>
        <h1>Feed</h1>
        {feed && items}
      </Fragment>
    )
  }
}

export default graphql<IProps, IData, IVariables, TChildProps>(FEED_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(FeedPage)
