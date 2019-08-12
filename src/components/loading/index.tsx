import React, { PropsWithChildren } from 'react'
import { StyledLoading, StyledLoadingProps } from './style'
import Spinner from './spinner'
import { Color } from '../globals'

type TLoadingProps = StyledLoadingProps

export const Loading = (props: PropsWithChildren<TLoadingProps>) => (
  // @ts-ignore
  <StyledLoading {...props}>
    <Color color={'fades.white.5'}><Spinner size={32}/></Color>
    {props.children && <Color mt={'base'}>{props.children}</Color>}
  </StyledLoading>
)
