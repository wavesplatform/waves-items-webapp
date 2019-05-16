import React, { Component, createContext, ReactNode } from 'react'
import { withApollo, WithApolloClient } from 'react-apollo'
import { IUser } from '../../types'
import { authService } from '../../services/auth/AuthService'
import { KeeperContext } from './keeper'

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

    const user = authService.getUser()
    const token = user && authService.getToken(user.address)
    if (user && token) {
      this.state.user = user
    }
  }

  signIn = (token: string, user: IUser) => {
    authService.setToken(user.address, token)
    this._setUser(user)
  }

  signOut = () => {
    this.state.user && authService.removeToken(this.state.user.address)
    this._setUser(null)
  }

  componentDidMount(): void {
  }

  componentDidUpdate(prevProps: Readonly<WithApolloClient<IProps>>, prevState: Readonly<{}>, snapshot?: any): void {
    // Account from keeper
    const { account, network } = this.context
    if (account) {
      const { address, publicKey } = account

      if (this.state.user && address === this.state.user.address) {
        return
      }

      if (!authService.getToken(address)) {
        return
      }

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
    authService.setUser(user)
    this.setState({
      user,
    })
  }
}

const AuthProvider = withApollo<IProps>(AuthProviderBase)
const AuthConsumer = AuthContext.Consumer

export {
  AuthProvider,
  AuthConsumer
}
