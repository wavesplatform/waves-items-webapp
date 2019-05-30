import React, { Component, ComponentType, createContext, PureComponent, ReactNode } from 'react'
import { withApollo, WithApolloClient } from 'react-apollo'
import { IPublicState } from '../helpers/keeper'
import keeperHelper from '../helpers/keeper'

interface IProps {
}

interface IKeeperState extends Partial<IPublicState> {
}

export interface IKeeperContext extends IKeeperState {
}

export const KeeperContext = createContext<IKeeperContext>({})

class KeeperProviderBase extends Component<WithApolloClient<IProps>> {
  state: IKeeperState = {}

  constructor(props: WithApolloClient<IProps>) {
    super(props)

    // const publicState = keeperHelper.getPublicState()
    // this.state = {
    //   ...publicState,
    // }
  }

  async componentDidMount() {
    const { client } = this.props
    try {
      const keeper = await keeperHelper.init()

      if (!keeper) {
        return
      }

      // console.log(keeper)
      const publicState = await keeper.publicState()
      const { initialized, account, network, locked } = publicState

      this._setPublicState({
        initialized: true,
        account,
        network,
        locked,
      })

      keeper.on('update', (state: IPublicState) => {
        const { initialized, account, network, locked } = state

        // TODO: temp check changes
        if (account && this.state.account && account.address === this.state.account.address) {
          return
        }

        this._setPublicState({
          initialized,
          account,
          network,
          locked,
        })
      })

    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    console.log('KeeperProvider render()')
    return (
      <KeeperContext.Provider value={{
        account: this.state.account,
        network: this.state.network,
        locked: this.state.locked,
        initialized: this.state.initialized,
      }}>
        {this.props.children}
      </KeeperContext.Provider>
    )
  }

  _setPublicState = (publicState: IPublicState) => {
    // keeperHelper.setPublicState(publicState)
    this.setState({
      ...publicState,
    })
  }
}

const KeeperProvider = withApollo<IProps>(KeeperProviderBase)
const KeeperConsumer = KeeperContext.Consumer

const withKeeperContext = <P extends {}>(Component: ComponentType<P>) =>
  class WithKeeperContext extends PureComponent<P & IKeeperContext> {
    render(): ReactNode {
      return (
        <KeeperConsumer>
          {context => <Component {...this.props} {...context}/>}
        </KeeperConsumer>
      )
    }
  }

export {
  KeeperProvider,
  KeeperConsumer,
  withKeeperContext,
}
