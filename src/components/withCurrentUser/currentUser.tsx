import React, { Component, ComponentType, createContext, PureComponent, ReactNode } from 'react'
import { IUser } from '../../types'
import { ChildProps, compose, graphql, withApollo, WithApolloClient } from 'react-apollo'
import { MeQuery } from '../../graphql/queries/__generated__/MeQuery'
import { getMeQuery } from '../../graphql/queries/getMe'
import { Signin } from '../../graphql/mutations/__generated__/Signin'
import authHelper from '../../helpers/auth'

type TProps = {}
type TData = MeQuery
type TChildProps = ChildProps<TProps, TData>

export type TCurrentUserContext = {
  me?: IUser
  meIsLoading?: boolean
}

export type WithCurrentUserProps<T = {}> = T & TCurrentUserContext

export const CurrentUserContext = createContext<TCurrentUserContext>({
  meIsLoading: false,
})

class CurrentUserProviderBase extends Component<WithApolloClient<TProps>> {
  state: TCurrentUserContext = {}

  componentDidMount() {
  }

  render(): ReactNode {
    // const { data } = this.props
    // const { me } = data!
    // console.log(me)

    return (
      <CurrentUserContext.Provider value={{
        me: this.state.me,
        meIsLoading: this.state.meIsLoading,
      }}>
        {this.props.children}
      </CurrentUserContext.Provider>
    )
  }

  _handleCompleted = async (data: TData) => {
    console.log('_handleCompleted, L 51 data:', data)
  }
}

export const withMe = graphql<TProps, TData>(getMeQuery, {
  options: {
    fetchPolicy: 'cache-first',
  },
})

const CurrentUserProvider = withApollo(CurrentUserProviderBase)
const CurrentUserConsumer = CurrentUserContext.Consumer

// const withCurrentUser = <P extends {}>(WrappedComponent: ComponentType<WithCurrentUserProps<P>>) =>
//   class WithCurrentUserContext extends PureComponent<P> {
//     render(): ReactNode {
//       return (
//         <CurrentUserConsumer>
//           {(context: TCurrentUserContext) => <WrappedComponent {...this.props} {...context} />}
//         </CurrentUserConsumer>
//       )
//     }
//   }

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

export {
  CurrentUserProvider,
  CurrentUserConsumer,
  withCurrentUser,
}
