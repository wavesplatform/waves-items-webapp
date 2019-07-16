import React, { Component, ComponentType, createContext, PureComponent, ReactNode } from 'react'
import { IUser } from '../types'
import { KeeperContext } from './keeper'
import authHelper from '../helpers/auth'
import { compose, withApollo, WithApolloClient } from 'react-apollo'
import { MeQuery, MeQuery_me } from '../graphql/queries/__generated__/MeQuery'

type TProps = {}

export interface IAuthContext {
  setUser: (user: IUser | null) => void
}

export type WithAuthContextProps<T = {}> = T & IAuthContext

export const AuthContext = createContext<IAuthContext>({
  setUser: (user: IUser | null) => {
  },
})

class AuthProviderBase extends Component<WithApolloClient<TProps>> {
  static contextType = KeeperContext

  constructor(props: WithApolloClient<TProps>) {
    super(props)
  }

  setUser = (user: IUser | null) => {
    // this._setUser(user)
    this.props.client.writeData({ data: { me: user as MeQuery_me } })
  }

  componentDidMount(): void {
  }

  componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<{}>, snapshot?: any): void {
    // When updated keeper state

    // Account from keeper
    const { publicState: { account, network } } = this.context
    if (account) {
      const { address, publicKey } = account

      // if (!authHelper.getToken()) {
      //   return
      // }

      // If address has been changed
      // this._setUser({
      //   address,
      //   publicKey,
      // })
    }
  }

  render(): ReactNode {
    return (
      <AuthContext.Provider value={{
        setUser: this.setUser,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }

  // _setUser = (user: IUser | null) => {
  //   console.log('_setUser, L 107 user:', user)
  //   // TODO: need fix types
  //   // this.props.client.writeData<MeQuery>({ data: { me: null } })
  //
  //   this.setState({
  //     user,
  //   })
  // }
}

const AuthProvider = withApollo<TProps>(AuthProviderBase)
const AuthConsumer = AuthContext.Consumer

const withAuthContext = <P extends {}>(WrappedComponent: ComponentType<P & IAuthContext>) =>
  class WithAuthContext extends PureComponent<P> {
    render(): ReactNode {
      return (
        <AuthConsumer>
          {(context: IAuthContext) => <WrappedComponent {...this.props} {...context} />}
        </AuthConsumer>
      )
    }
  }

export {
  AuthProvider,
  AuthConsumer,
  withAuthContext,
}
