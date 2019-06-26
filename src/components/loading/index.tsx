import React from 'react'
import { StyledLoading, StyledLoadingProps } from './style'

type TLoadingProps = StyledLoadingProps

export const Loading = (props: TLoadingProps) => (
  // @ts-ignore
  <StyledLoading {...props}>
    Loading...
  </StyledLoading>
)
