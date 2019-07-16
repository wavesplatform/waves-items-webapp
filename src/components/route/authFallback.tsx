import React, { ComponentType } from 'react'
import { withCurrentUser, WithCurrentUserProps } from '../withCurrentUser/currentUser'

type TSwitchProps = {
  Component: ComponentType<any>
  FallbackComponent: ComponentType<any>
  isGame: boolean
}

const Switch = (props: WithCurrentUserProps<TSwitchProps>) => {
  const { Component, FallbackComponent, isGame, me, meIsLoading, ...rest } = props

  if (meIsLoading) {
    return <Component {...rest}/>
  }

  if (
    me &&
    (!isGame || (isGame && me.role === 'GAME'))
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
