import React, { Component, FormEvent, ReactNode } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { AuthContext } from '../../contexts/auth'
import keeperHelper from '../../helpers/keeper'
import { KeeperConsumer } from '../../contexts/keeper'
import { signinMutation } from '../../graphql/mutations/signIn'
import { Signin, SigninVariables } from '../../graphql/mutations/__generated__/Signin'
import { config } from '../../config/config'
import { Button } from '../buttons'
import { TextInput } from '../inputs'
import { Form } from '../globals'

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

  render(): ReactNode {
    return (
      <KeeperConsumer>
        {({ account, network }) => (
          <SigninMutation
            mutation={signinMutation}
            onCompleted={this._handleCompleted}
          >
            {(signin, { loading, error }) => {
              return (
                <Form
                  onSubmit={ev => this._handleSubmit(ev, signin)}
                >
                  {account && <TextInput value={account.address} disabled={true}>Account Address</TextInput>}
                  <Button type='submit' variant='primary'>Sign In</Button>
                </Form>
              )
            }}
          </SigninMutation>
        )}
      </KeeperConsumer>
    )
  }

  _handleSubmit = async (ev: FormEvent, signin: MutationFn<Signin, SigninVariables>) => {
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

  _handleCompleted = async (data: Signin) => {
    const { token, user } = data.signin
    this.context.signIn(token, user)
    // Redirect
  }
}

export default SigninForm
