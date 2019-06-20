import React from 'react'
import { StyledButton, StyledButtonProps, StyledIconButton } from './style'
import { Icon } from '../icon'

type TButtonProps = StyledButtonProps

export const Button = (props: TButtonProps) => (
  // @ts-ignore
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
)

type TIconButtonProps = TButtonProps & {
  glyph: string
}

export const IconButton = (props: TIconButtonProps) => (
  // @ts-ignore
  <StyledIconButton {...props}>
    <Icon glyph={props.glyph}/>
  </StyledIconButton>
)
