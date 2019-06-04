import React from 'react'
import { ButtonProps } from 'rebass'
import { StyledButton, StyledIconButton } from './style'
import { Icon } from '../icon'

interface IButtonProps extends ButtonProps {
}

export const Button = (props: IButtonProps) => (
  // @ts-ignore
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
)

interface IIconButtonProps extends IButtonProps {
  glyph: string
}

export const IconButton = (props: IIconButtonProps) => (
  // @ts-ignore
  <StyledIconButton {...props}>
    <Icon glyph={props.glyph}/>
  </StyledIconButton>
)
