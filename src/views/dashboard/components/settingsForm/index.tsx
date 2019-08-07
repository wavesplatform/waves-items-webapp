import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { UpdateUserInfo, UpdateUserInfoVariables } from '../../../../graphql/mutations/__generated__/UpdateUserInfo'
import withCurrentUser, { WithCurrentUserProps } from '../../../../components/withCurrentUser'
import { updateUserInfoMutation } from '../../../../graphql/mutations/updateUserInfo'
import { Form, Small } from '../../../../components/globals'
import { TextInput } from '../../../../components/inputs'
import { Button } from '../../../../components/buttons'

class UpdateUserInfoMutation extends Mutation<UpdateUserInfo, UpdateUserInfoVariables> {
}

type TProps = WithCurrentUserProps<{}>

type TState = {
  isLoading: boolean
  name?: string
  email?: string
}

class SettingsForm extends Component<TProps> {
  state: TState = {
    isLoading: false,
  }

  constructor(props: TProps) {
    super(props)

    const { me } = props

    this.state.name = me.name || ''
    this.state.email = me.email || ''
  }

  render(): ReactNode {
    const { me } = this.props

    return (
      <UpdateUserInfoMutation
        mutation={updateUserInfoMutation}
        onCompleted={this._handleCompleted}
        onError={err => {
          console.log(err)

          this.setState({
            isLoading: false,
          })
        }}
      >
        {(updateUserInfo, { loading, error }) => {
          return (
            <Form
              onSubmit={ev => this._handleSubmit(ev, updateUserInfo)}
            >
              {me && <TextInput value={me.address} disabled={true}>Account Address</TextInput>}
              <TextInput value={this.state.name}
                         placeholder={'Your username'}
                         onChange={this._changeName}
              >Name</TextInput>
              <TextInput value={this.state.email}
                         placeholder={'Your email'}
                         onChange={this._changeEmail}
              >Email</TextInput>
              <Button type='submit' variant='primary' width={'110px'} mt={'lg'} disabled={this.state.isLoading}>
                {this.state.isLoading ? 'Loading...' : 'Save'}
              </Button>
            </Form>
          )
        }}
      </UpdateUserInfoMutation>
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

  _handleSubmit = async (ev: FormEvent, updateUserInfo: MutationFn<UpdateUserInfo, UpdateUserInfoVariables>) => {
    ev.preventDefault()

    const { name, email } = this.state

    this.setState({
      isLoading: true,
    })

    await updateUserInfo({
      variables: {
        input: {
          name,
          email,
        },
      },
    })
  }

  _handleCompleted = async (data: UpdateUserInfo) => {
    this.setState({
      isLoading: false,
    })
  }
}

export default withCurrentUser(SettingsForm)
