import React, { Component, FormEvent, ReactNode } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import gql from 'graphql-tag'
import { Signin, SigninVariables } from './__generated__/Signin'
import { config } from '../../config/config'
import { keeperService } from '../../services/keeper/KeeperService'
import { AuthContext } from '../../contexts/auth/AuthContext'
import { KeeperConsumer } from '../../contexts/keeper/KeeperContext'
import { Button } from '@crutch/components'

class SigninMutation extends Mutation<Signin, SigninVariables> {
}

interface ISigninState {
  name: string,
}

export class SigninForm extends Component<{}> {
  static contextType = AuthContext

  state: ISigninState = {
    name: '',
  }

  handleSubmit = async (ev: FormEvent, signin: MutationFn<Signin, SigninVariables>) => {
    ev.preventDefault()
    const keeper = keeperService.keeper

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
            mutation={SIGNIN_MUTATION}
            onCompleted={this.handleCompleted}
          >
            {(signin, { loading, error }) => {
              return (
                <form
                  onSubmit={ev => this.handleSubmit(ev, signin)}
                >
                  {account && account.address}
                  <Button type='submit' size={'lg'}>Sign In</Button>
                </form>
              )
            }}
          </SigninMutation>
        )}

      </KeeperConsumer>
    )
  }

}

const SIGNIN_MUTATION = gql`
  mutation Signin($address: String!, $publicKey: String!, $sign: String!) {
    signin(address: $address, publicKey: $publicKey, sign: $sign) {
      token
      user {
        id
        address
        name
      }
    }
  }
`

export default SigninForm
