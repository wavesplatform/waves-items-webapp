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
      return <Loading/>
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
              <RoleOption active={isUser} onClick={async () => {
                await this._toggle(UserRole.USER, updateTestRole)
              }}>
                <RadioInput
                  mt={0}
                  mb={'sm'}
                  value={UserRole.USER}
                  readOnly={true}
                  checked={isUser}
                >
                  <RoleOptionTitle>User</RoleOptionTitle>
                </RadioInput>
                <Paragraph mb={0}>Lorem ipsum is placeholder text commonly used in the graphic, print.</Paragraph>
              </RoleOption>
              <RoleOption active={isTest} onClick={async () => {
                await this._toggle(UserRole.TEST, updateTestRole)
              }}>
                <RadioInput
                  mt={0}
                  mb={'sm'}
                  value={UserRole.TEST}
                  readOnly={true}
                  checked={isTest}
                >
                  <RoleOptionTitle>Test</RoleOptionTitle>
                </RadioInput>
                <Paragraph mb={0}>Lorem ipsum is placeholder text commonly used in the graphic, print.</Paragraph>
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
