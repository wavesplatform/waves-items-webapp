import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { AuthContext } from '../../contexts/auth'
import keeperHelper from '../../helpers/keeper'
import { IKeeperContext, withKeeperContext } from '../../contexts/keeper'
import { signinMutation } from '../../graphql/mutations/signIn'
import { Signin, SigninVariables } from '../../graphql/mutations/__generated__/Signin'
import { config } from '../../config/config'
import { Button } from '../buttons'
import { TextInput } from '../inputs'
import { Form, Small } from '../globals'
import { Toast } from '../toasts'

class SigninMutation extends Mutation<Signin, SigninVariables> {
}

interface ISigninState {
  name?: string,
  email?: string,
}

class SigninForm extends Component<{} & IKeeperContext> {
  static contextType = AuthContext

  state: ISigninState = {}

  render(): ReactNode {
    const { installed, hasAccounts, state } = this.props
    const { account, network } = state

    if (!installed) {
      return (
        <>
          <Toast mb={'base'}>
            You must install Keeper to access the vault.<br />
            This will also act as your login to the game (no extra password needed).
          </Toast>
          <Button
            as={'a'}
            variant='primary'
            href='https://chrome.google.com/webstore/detail/waves-keeper/lpilbniiabackdjcionkobglmddfbcjo'
            target='_blank'
          >Install Keeper</Button>
        </>
      )
    } else if (!hasAccounts) {
      return <Toast mb={'base'}>
        Please add your account to Keeper to access the vault.
    </Toast>
    }

    if (network && network.code !== config.networkCode) {
      return (
        <>
          <Toast mb={'base'}>
            Incorrect Waves network.<br />
            Please select another network.
          </Toast>
        </>
      )
    }

    return (
      <SigninMutation
        mutation={signinMutation}
        onCompleted={this._handleCompleted}
        onError={err => {
          console.log(err)
        }}
      >
        {(signin, { loading, error }) => {
          return (
            <Form
              onSubmit={ev => this._handleSubmit(ev, signin)}
            >
              {account && <TextInput value={account.address} disabled={true}>Account Address</TextInput>}
              <TextInput value={this.state.name}
                placeholder={'Your username'}
                onChange={this._changeName}
              >Name <Small color={'placeholder'}>(optional)</Small></TextInput>
              <TextInput value={this.state.email}
                placeholder={'Your email'}
                onChange={this._changeEmail}
              >Email <Small color={'placeholder'}>(optional)</Small></TextInput>
              <Button type='submit' variant='primary' mt={'base'}>Sign In</Button>
            </Form>
          )
        }}
      </SigninMutation>
    )
  }

  _changeName = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.value

    this.setState({
      name,
    })
  }

  _changeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
    const email = ev.target.value

    this.setState({
      email,
    })
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
    const { name, email } = this.state

    await signin({
      variables: {
        input: {
          address,
          publicKey,
          sign: signature,
          name,
          email,
        },
      },
    })
  }

  _handleCompleted = async (data: Signin) => {
    const { token, user } = data.signin
    this.context.signIn(token, user)
    // Redirect
  }
}

export default withKeeperContext(SigninForm)
