import React from 'react'
import { ButtonProps } from 'rebass'
import { StyledButton } from './style'

interface IButtonProps extends ButtonProps {
}

export const Button = (props: IButtonProps) => (
  // @ts-ignore
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
)
