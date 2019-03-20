import React, { Component, Fragment, ReactNode } from 'react'
import { graphql, ChildProps } from 'react-apollo'
import { gql, ApolloError } from 'apollo-boost'
import './FeedPage.scss'
import { FeedQuery } from './__generated__/FeedQuery'
import { config } from '../../global/config'

interface IProps { }

interface IData extends FeedQuery {
  loading: boolean
  error: ApolloError
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
      name
      game {
        name
      }
    }
  }
`, config.gqlOptions)
export class FeedPage extends Component<TChildProps> {
  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data
    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>

    const items = data.items.map(item => (
      <p key={item.id}>
        <>
          {item.id}: {item.name}
        </>
      </p>
    ))

    return (
      <Fragment>
        <h1>Feed</h1>
        {items && items}
      </Fragment>
    )
  }
}

