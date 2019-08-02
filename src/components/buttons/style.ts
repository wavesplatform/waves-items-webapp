import styled, { css } from 'styled-components'
import { Button, ButtonProps } from 'rebass'
import { variant } from 'styled-system'
import { LinkProps } from 'react-router-dom'

const buttonSizeStyle = variant({
  key: 'buttonSizes',
  prop: 'size',
})

export interface StyledButtonProps extends Pick<ButtonProps, Exclude<keyof ButtonProps, 'size'>> {
  size?: string
}

export const StyledButton = styled(Button)<StyledButtonProps & Partial<LinkProps>>`
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? .5 : 1)};
  
  ${props => !props.disabled && css`
    &:hover,
    &:focus {
      opacity: .9;
    }
  `}
  
  ${buttonSizeStyle}
`
StyledButton.defaultProps = {
  ...StyledButton.defaultProps,
  type: 'button',
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
  line-height: 1;
`
StyledIconButton.defaultProps = {
  ...StyledIconButton.defaultProps,
  px: 0,
  py: 0,
  borderRadius: '50%',
  fontSize: 'lg',
}
