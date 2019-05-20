import React, { Component, FormEvent, ReactNode } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { AuthContext } from '../../contexts/auth'
import keeperHelper from '../../helpers/keeper'
import { KeeperConsumer } from '../../contexts/keeper'
import { signinMutation } from '../../graphql/mutations/signIn'
import { Signin, SigninVariables } from '../../graphql/mutations/__generated__/Signin'
import { Button } from 'rebass'
import { config } from '../../config/config'

class SigninMutation extends Mutation<Signin, SigninVariables> {
}

interface ISigninState {
  name: string,
}

class SigninForm extends Component<{}> {
  static contextType = AuthContext

  state: ISigninState = {
    name: '',
  }

  handleSubmit = async (ev: FormEvent, signin: MutationFn<Signin, SigninVariables>) => {
    ev.preventDefault()
    const keeper = keeperHelper.keeper

    if (!keeper) {
      return
    }

    // Auth by Keeper
    const auth = await keeper.auth({
      data: config.authData,
    })
    const { address, publicKey, signature } = auth

    await signin({
      variables: {
        address,
        publicKey,
        sign: signature,
      },
    })
  }

  handleCompleted = async (data: Signin) => {
    const { token, user } = data.signin
    this.context.signIn(token, user)
    // Redirect
  }

  render(): ReactNode {
    return (
      <KeeperConsumer>
        {({ account, network }) => (
          <SigninMutation
            mutation={signinMutation}
            onCompleted={this.handleCompleted}
          >
            {(signin, { loading, error }) => {
              return (
                <form
                  onSubmit={ev => this.handleSubmit(ev, signin)}
                >
                  {account && account.address}
                  <Button type='submit'>Sign In</Button>
                </form>
              )
            }}
          </SigninMutation>
        )}

      </KeeperConsumer>
    )
  }

}

export default SigninForm
