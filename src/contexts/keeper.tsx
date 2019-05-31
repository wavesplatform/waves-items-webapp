import React, { Component, ComponentType, createContext, PureComponent, ReactNode } from 'react'
import { withApollo, WithApolloClient } from 'react-apollo'
import { IPublicState } from '../helpers/keeper'
import keeperHelper from '../helpers/keeper'

interface IProps {
}

interface IKeeperState extends Partial<IPublicState> {
}

export interface IKeeperContext {
  installed: boolean
  hasAccounts: boolean
  state: IKeeperState
}

const defaultKeeperContext: IKeeperContext = { installed: false, hasAccounts: false, state: {} }

export const KeeperContext = createContext<IKeeperContext>(defaultKeeperContext)

class KeeperProviderBase extends Component<WithApolloClient<IProps>, IKeeperContext> {
  state: IKeeperContext = defaultKeeperContext

  constructor(props: WithApolloClient<IProps>) {
    super(props)

    // const publicState = keeperHelper.getPublicState()
    // this.state = {
    //   ...publicState,
    // }
  }

  async componentDidMount() {

    try {
      const keeper = await keeperHelper.init()

      if (!keeper)
        return

      this.setState({ installed: true })

      keeper.on('update', (state: IPublicState) => {

        const { account } = state

        // TODO: temp check changes
        if (account && this.state.state && this.state.state.account &&
          account.address === this.state.state.account.address) {
          return
        }

        this.setState({ state, hasAccounts: account != undefined })
      })

      const publicState = await keeper.publicState()

      this.setState({ state: publicState, hasAccounts: true })

    } catch (err) {
      if (err.code === 14)
        this.setState({ hasAccounts: false })

      console.warn(err)
    }
  }
  render() {
    console.log('KeeperProvider render()')
    return (
      <KeeperContext.Provider value={{
        state: this.state.state,
        hasAccounts: this.state.hasAccounts,
        installed: this.state.installed,
      }}>
        {this.props.children}
      </KeeperContext.Provider>
    )
  }

}

const KeeperProvider = withApollo<IProps>(KeeperProviderBase)
const KeeperConsumer = KeeperContext.Consumer

const withKeeperContext = <P extends {}>(Component: ComponentType<P>) =>
  class WithKeeperContext extends PureComponent<P & IKeeperContext> {
    render(): ReactNode {
      return (
        <KeeperConsumer>
          {context => <Component {...this.props} {...context} />}
        </KeeperConsumer>
      )
    }
  }

export {
  KeeperProvider,
  KeeperConsumer,
  withKeeperContext,
}
