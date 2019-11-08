import React, { Component, FormEvent, ReactNode } from 'react'
import { compose, Mutation, MutationFn, withApollo, WithApolloClient } from 'react-apollo'
import keeperHelper from '../../helpers/keeper'
import { IKeeperContext, withKeeperContext } from '../../contexts/keeper'
import { signinMutation } from '../../graphql/mutations/signIn'
import { Signin, SigninVariables } from '../../graphql/mutations/__generated__/Signin'
import { config } from '../../config/config'
import { Button } from '../buttons'
import { TextInput } from '../inputs'
import { Form } from '../globals'
import { Toast } from '../toasts'
import { isFirefox } from '../../helpers/browser'
import { RouteComponentProps, withRouter } from 'react-router'
import authHelper from '../../helpers/auth'
import TagManager from 'react-gtm-module'

class SigninMutation extends Mutation<Signin, SigninVariables> {
}

type TProps = RouteComponentProps & {
  redirectUrl: string
}

class SigninForm extends Component<WithApolloClient<TProps> & IKeeperContext> {
  render(): ReactNode {
    const { installed, hasAccounts, publicState, checkPublicState } = this.props
    checkPublicState()

    const { account, network } = publicState

    if (!installed) {
      return (
        <>
          <Toast mb={'base'}>
            Interaction with Items Market requires a free browser extention Waves Keeper.
            <br/><br/>You can also create a new account there.

          </Toast>
          <Button
            as={'a'}
            variant='primary'
            href={
              isFirefox() ?
                'https://addons.mozilla.org/ru/firefox/addon/waves-keeper/' :
                'https://chrome.google.com/webstore/detail/waves-keeper/lpilbniiabackdjcionkobglmddfbcjo'
            }
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
            Incorrect Waves network.<br/>
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
              <Button type='submit' variant='primary' size={'lg'} width={1} mt={'lg'}>Sign In via Keeper</Button>
            </Form>
          )
        }}
      </SigninMutation>
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
    const { address, publicKey, signature, host } = auth

    TagManager.dataLayer({ dataLayer: { event: 'signinattempt' } })

    await signin({
      variables: {
        input: {
          address,
          publicKey,
          sign: signature,
          webappHost: host,
        },
      },
      update: (store, { data }) => {
        if (!data) {
          return
        }

        const { token, user } = data.signin
        authHelper.setToken(token)
        // GTM
        TagManager.dataLayer({
          dataLayer: {
            userId: user.address,
            event: 'signinsuccess',
          },
        })
      },
      refetchQueries: () => ['MeQuery'],
    })
  }

  _handleCompleted = async (data: Signin) => {
    this.props.history.push(this.props.redirectUrl)
  }
}

export default compose(withRouter, withKeeperContext, withApollo)(SigninForm)
