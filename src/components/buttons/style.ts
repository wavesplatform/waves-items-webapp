import styled from 'styled-components'
import { Button, ButtonProps } from 'rebass'

export const StyledButton = styled(Button)<ButtonProps>`
  cursor: pointer;
  
  &:hover,
  &:focus {
    opacity: .9;
  }
`
StyledButton.defaultProps = {
  ...StyledButton.defaultProps,
  borderRadius: 'base',
  px: 3,
  py: 2,
  fontWeight: 'normal',
  bg: 'element',
  border: '2px solid transparent',
}

export const StyledIconButton = styled(StyledButton)`
  width: 40px;
  height: 40px;
`
StyledIconButton.defaultProps = {
  ...StyledIconButton.defaultProps,
  px: 0,
  py: 0,
  borderRadius: '50%',
  fontSize: 'lg',
}
