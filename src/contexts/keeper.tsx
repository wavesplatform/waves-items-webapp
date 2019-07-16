import React, { Component, ComponentType, createContext, PureComponent, ReactNode } from 'react'
import { compose, withApollo, WithApolloClient } from 'react-apollo'
import { IPublicState } from '../helpers/keeper'
import keeperHelper from '../helpers/keeper'
import authHelper from '../helpers/auth'
import withCurrentUser, { WithCurrentUserProps } from '../components/withCurrentUser'

type TProps = WithCurrentUserProps

interface IKeeperState extends Partial<IPublicState> {
}

export interface IKeeperContext {
  installed: boolean
  hasAccounts: boolean
  publicState: IKeeperState
  checkPublicState: () => void
}

const defaultKeeperContext: IKeeperContext = {
  installed: false,
  hasAccounts: false,
  publicState: {},
  checkPublicState: () => {
  },
}

export const KeeperContext = createContext<IKeeperContext>(defaultKeeperContext)

class KeeperProviderBase extends Component<WithApolloClient<TProps>, IKeeperContext> {
  state: IKeeperContext = defaultKeeperContext

  constructor(props: WithApolloClient<TProps>) {
    super(props)

    // const publicState = keeperHelper.getPublicState()
    // this.publicState = {
    //   ...publicState,
    // }
  }

  checkPublicState = async () => {
    const { account } = this.state.publicState
    const keeper = keeperHelper.keeper

    if (!account && keeper) {
      try {
        const publicState = await keeper.publicState()
        keeperHelper.setPublicState(publicState)
        this.setState({ publicState, hasAccounts: true })
      } catch (err) {
        if (err.code === 14) {
          this.setState({ hasAccounts: false })
        }
      }
    }
  }

  async componentDidMount() {
    try {
      const keeper = await keeperHelper.init()

      if (!keeper) {
        return
      }

      this.setState({ installed: true })

      keeper.on('update', (publicState: IPublicState) => {
        const { me, client } = this.props
        const { account } = publicState

        // TODO: temp check changes
        if (account && this.state.publicState && this.state.publicState.account) {
          if (
            account.address === this.state.publicState.account.address &&
            account.balance === this.state.publicState.account.balance
          ) {
            return
          }
        }

        keeperHelper.setPublicState(publicState)

        if (account && me && account.address !== me.address) {
          authHelper.removeToken()
          client.writeData({ data: { me: null } })
        }

        this.setState({ publicState, hasAccounts: !!account })
      })

      const publicState = keeperHelper.getPublicState()
      publicState && this.setState({ publicState, hasAccounts: !!publicState.account })
    } catch (err) {
      // TODO: need replace to const
      if (err.code === 14) {
        this.setState({ hasAccounts: false })
      }

      console.warn(err)
    }
  }

  render() {
    return (
      <KeeperContext.Provider value={{
        publicState: this.state.publicState,
        checkPublicState: this.checkPublicState,
        hasAccounts: this.state.hasAccounts,
        installed: this.state.installed,
      }}>
        {this.props.children}
      </KeeperContext.Provider>
    )
  }

}

const KeeperProvider = compose(withApollo, withCurrentUser)(KeeperProviderBase)
const KeeperConsumer = KeeperContext.Consumer

const withKeeperContext = <P extends {}>(WrappedComponent: ComponentType<P & IKeeperContext>) =>
  class WithKeeperContext extends PureComponent<P> {
    render(): ReactNode {
      return (
        <KeeperConsumer>
          {(context: IKeeperContext) => <WrappedComponent {...this.props} {...context} />}
        </KeeperConsumer>
      )
    }
  }

export {
  KeeperProvider,
  KeeperConsumer,
  withKeeperContext,
}
