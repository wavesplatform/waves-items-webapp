import React, { ComponentType } from 'react'
import { IUser } from '../../types'
import { graphql } from 'react-apollo'
import { MeQuery } from '../../graphql/queries/__generated__/MeQuery'
import { getMeQuery } from '../../graphql/queries/getMe'
import TagManager from 'react-gtm-module'

type TProps = {}
type TData = MeQuery

export type TCurrentUser = {
  me: IUser
  meIsLoading?: boolean
}

export type WithCurrentUserProps<T = {}> = T & TCurrentUser

const withCurrentUser = <P extends {}>(WrappedComponent: ComponentType<WithCurrentUserProps<P>>) =>
  // @ts-ignore
  graphql<TProps, TData>(getMeQuery, {
    options: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
    },
    props: props => {
      const { data } = props
      const { me, loading } = data!

      return {
        me,
        meIsLoading: loading,
      }
    },
  })(WrappedComponent)

export default withCurrentUser
