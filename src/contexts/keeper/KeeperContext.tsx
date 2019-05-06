import React, { Component, createContext } from 'react'
import { IPublicState, keeperService } from '../../services/keeper/KeeperService'
import { withApollo, WithApolloClient } from 'react-apollo'

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

    const publicState = keeperService.getPublicState()
    this.state = {
      ...publicState,
    }
  }

  async componentDidMount() {
    const { client } = this.props
    try {
      const keeper = await keeperService.init()

      if (!keeper) {
        return
      }

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

      // this.state.keeper.auth({
      //   data: 'Waves Vault Items',
      // })

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
    keeperService.setPublicState(publicState)
    this.setState({
      ...publicState,
    })
  }
}

const KeeperProvider = withApollo<IProps>(KeeperProviderBase)
const KeeperConsumer = KeeperContext.Consumer

export { KeeperProvider, KeeperConsumer }
