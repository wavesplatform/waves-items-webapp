import React, { ComponentType } from 'react'
import { IAuthContext, withAuthContext } from '../../contexts/auth'

type TSwitchProps = {
  Component: ComponentType<any>
  FallbackComponent: ComponentType<any>
  isGame: boolean
}

const Switch = (props: TSwitchProps & IAuthContext) => {
  const { Component, FallbackComponent, isGame, user, signIn, signOut, ...rest } = props

  if (
    user &&
    (!isGame || (isGame && user.role === 'GAME'))
  ) {
    return <Component {...rest}/>
  } else {
    return <FallbackComponent {...rest}/>
  }
}

const SwitchWithAuth = withAuthContext(Switch)

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
