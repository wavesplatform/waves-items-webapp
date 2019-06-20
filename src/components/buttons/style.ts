import styled from 'styled-components'
import { Button, ButtonProps } from 'rebass'
import { variant } from 'styled-system'

const buttonSizeStyle = variant({
  key: 'buttonSizes',
  prop: 'size',
})

export interface StyledButtonProps extends Pick<ButtonProps, Exclude<keyof ButtonProps, 'size'>> {
  size?: string
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  cursor: pointer;
  
  &:hover,
  &:focus {
    opacity: .9;
  }
  
  ${buttonSizeStyle}
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
