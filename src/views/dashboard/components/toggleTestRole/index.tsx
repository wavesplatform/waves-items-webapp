import React, { Component, ReactNode } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { UpdateTestRole, UpdateTestRoleVariables } from '../../../../graphql/mutations/__generated__/UpdateTestRole'
import { updateTestRoleMutation } from '../../../../graphql/mutations/updateTestRole'
import { RoleOption, RoleOptionTitle, RoleSelector } from './style'
import { Paragraph } from '../../../../components/globals'
import { RadioInput } from '../../../../components/inputs'
import { UserRole } from '../../../../__generated__/globalTypes'
import { Loading } from '../../../../components/loading'
import withCurrentUser, { WithCurrentUserProps } from '../../../../components/withCurrentUser'

class UpdateTestRoleMutation extends Mutation<UpdateTestRole, UpdateTestRoleVariables> {
}

type TProps = {}

class ToggleTestRole extends Component<WithCurrentUserProps<TProps>> {
  render(): ReactNode {
    const { me } = this.props

    if (!me) {
      return <Loading />
    }

    const isUser = me.role === UserRole.USER
    const isTest = me.role === UserRole.TEST

    return (
      <UpdateTestRoleMutation
        mutation={updateTestRoleMutation}
        onError={err => {
          console.log(err)
        }}
      >
        {(updateTestRole, { loading, error }) => {
          return (
            <RoleSelector>
              <RoleOption width={3 / 7} active={isUser} onClick={async () => {
                await this._toggle(UserRole.USER, updateTestRole)
              }}>
                <RadioInput
                  mt={0}
                  mb={'sm'}
                  value={UserRole.USER}
                  readOnly={true}
                  checked={isUser}
                >
                  <RoleOptionTitle>Player</RoleOptionTitle>
                </RadioInput>
                <Paragraph mb={0}>Default behaviour. Allows you to use item market as player.</Paragraph>
              </RoleOption>
              <RoleOption width={4 / 7} active={isTest} onClick={async () => {
                await this._toggle(UserRole.TEST, updateTestRole)
              }}>
                <RadioInput
                  mt={0}
                  mb={'sm'}
                  value={UserRole.TEST}
                  readOnly={true}
                  checked={isTest}
                >
                  <RoleOptionTitle>Game Sandbox</RoleOptionTitle>
                </RadioInput>
                <Paragraph mb={0}>
                  This mode allows you to use this account as a game test environment.
                  As long as you're using this account type the sandboxed game would
                  be displayed as one of your games but won't be public.
                </Paragraph>
              </RoleOption>
            </RoleSelector>
          )
        }}
      </UpdateTestRoleMutation>
    )
  }

  _toggle = async (role: UserRole, updateTestRole: MutationFn<UpdateTestRole, UpdateTestRoleVariables>) => {
    if (this.props.me!.role === role) {
      return
    }

    await updateTestRole({
      variables: {
        enable: role === UserRole.TEST,
      },
    })

    // User on store will be updated
  }
}

export default withCurrentUser<TProps>(ToggleTestRole)
