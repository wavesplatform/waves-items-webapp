import React, { ComponentType } from 'react'
import withCurrentUser, { WithCurrentUserProps } from '../withCurrentUser'
import { UserRole } from '../../__generated__/globalTypes'
import { Loading } from '../loading'

type TSwitchProps = {
  Component: ComponentType<any>
  FallbackComponent: ComponentType<any>
  isGame: boolean
}

const Switch = (props: WithCurrentUserProps<TSwitchProps>) => {
  const { Component, FallbackComponent, isGame, me, meIsLoading, ...rest } = props

  if (meIsLoading) {
    return <Loading/>
    // return <Component {...rest}/>
  }

  if (
    me &&
    (!isGame || (isGame && me.role && [UserRole.GAME, UserRole.TEST].includes(me.role)))
  ) {
    return <Component {...rest}/>
  } else {
    return <FallbackComponent {...rest}/>
  }
}

const SwitchWithAuth = withCurrentUser(Switch)

const authFallback = (
  Component: ComponentType<any>,
  FallbackComponent: ComponentType<any>,
  isGame: boolean = false
) => {
  return (props: any) => (
    <SwitchWithAuth {...props} Component={Component} FallbackComponent={FallbackComponent} isGame={isGame}/>
  )
}

export default authFallback
