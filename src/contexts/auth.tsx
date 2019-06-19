import React, { Component, ComponentType, createContext, PureComponent, ReactNode } from 'react'
import { withApollo, WithApolloClient } from 'react-apollo'
import { IUser } from '../types'
import { KeeperContext } from './keeper'
import authHelper from '../helpers/auth'

interface IProps {
}

interface IAuthState {
  user?: IUser
}

export interface IAuthContext extends IAuthState {
  signIn: (token: string, user: IUser) => void
  signOut: () => void
}

export const AuthContext = createContext<IAuthContext>({
  signIn: (token: string, user: IUser) => {
  },
  signOut: () => {
  },
})

class AuthProviderBase extends Component<WithApolloClient<IProps>> {
  static contextType = KeeperContext

  state: IAuthState = {}

  constructor(props: WithApolloClient<IProps>) {
    super(props)

    const user = authHelper.getUser()
    const token = user && authHelper.getToken(user.address)
    if (user && token) {
      this.state.user = user
    }
  }

  signIn = (token: string, user: IUser) => {
    authHelper.setToken(user.address, token)
    this._setUser(user)
  }

  signOut = () => {
    this.state.user && authHelper.removeToken(this.state.user.address)
    this._setUser(null)
  }

  componentDidMount(): void {
  }

  componentDidUpdate(prevProps: Readonly<WithApolloClient<IProps>>, prevState: Readonly<{}>, snapshot?: any): void {
    // Account from keeper
    const { publicState: { account, network } } = this.context
    if (account) {
      const { address, publicKey } = account

      if (this.state.user && address === this.state.user.address) {
        return
      }

      if (!authHelper.getToken(address)) {
        return
      }

      // If address has been changed
      this._setUser({
        address,
        publicKey,
      })
    }
  }

  render(): ReactNode {
    console.log('AuthProvider render()')
    return (
      <AuthContext.Provider value={{
        user: this.state.user,
        signIn: this.signIn,
        signOut: this.signOut,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }

  _setUser = (user: IUser | null) => {
    console.log('_setUser', user)
    authHelper.setUser(user)
    this.setState({
      user,
    })
  }
}

const AuthProvider = withApollo<IProps>(AuthProviderBase)
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
